package wayfinding.web.rest;

import wayfinding.Application;
import wayfinding.domain.Tenant;
import wayfinding.repository.TenantRepository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.hamcrest.Matchers.hasItem;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


/**
 * Test class for the TenantResource REST controller.
 *
 * @see TenantResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest
public class TenantResourceTest {

    private static final String DEFAULT_NAME = "A";
    private static final String UPDATED_NAME = "B";
    private static final String DEFAULT_FLOOR = "AAAAA";
    private static final String UPDATED_FLOOR = "BBBBB";
    private static final String DEFAULT_LOCATION = "AAAAA";
    private static final String UPDATED_LOCATION = "BBBBB";
    private static final String DEFAULT_CONTENT = "AAAAA";
    private static final String UPDATED_CONTENT = "BBBBB";
    private static final String DEFAULT_CATEGORY = "AAAAA";
    private static final String UPDATED_CATEGORY = "BBBBB";

    @Inject
    private TenantRepository tenantRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restTenantMockMvc;

    private Tenant tenant;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        TenantResource tenantResource = new TenantResource();
        ReflectionTestUtils.setField(tenantResource, "tenantRepository", tenantRepository);
        this.restTenantMockMvc = MockMvcBuilders.standaloneSetup(tenantResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        tenant = new Tenant();
        tenant.setName(DEFAULT_NAME);
        tenant.setFloor(DEFAULT_FLOOR);
        tenant.setLocation(DEFAULT_LOCATION);
        tenant.setContent(DEFAULT_CONTENT);
        tenant.setCategory(DEFAULT_CATEGORY);
    }

    @Test
    @Transactional
    public void createTenant() throws Exception {
        int databaseSizeBeforeCreate = tenantRepository.findAll().size();

        // Create the Tenant

        restTenantMockMvc.perform(post("/api/tenants")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(tenant)))
                .andExpect(status().isCreated());

        // Validate the Tenant in the database
        List<Tenant> tenants = tenantRepository.findAll();
        assertThat(tenants).hasSize(databaseSizeBeforeCreate + 1);
        Tenant testTenant = tenants.get(tenants.size() - 1);
        assertThat(testTenant.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTenant.getFloor()).isEqualTo(DEFAULT_FLOOR);
        assertThat(testTenant.getLocation()).isEqualTo(DEFAULT_LOCATION);
        assertThat(testTenant.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testTenant.getCategory()).isEqualTo(DEFAULT_CATEGORY);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = tenantRepository.findAll().size();
        // set the field null
        tenant.setName(null);

        // Create the Tenant, which fails.

        restTenantMockMvc.perform(post("/api/tenants")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(tenant)))
                .andExpect(status().isBadRequest());

        List<Tenant> tenants = tenantRepository.findAll();
        assertThat(tenants).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTenants() throws Exception {
        // Initialize the database
        tenantRepository.saveAndFlush(tenant);

        // Get all the tenants
        restTenantMockMvc.perform(get("/api/tenants"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(tenant.getId().intValue())))
                .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
                .andExpect(jsonPath("$.[*].floor").value(hasItem(DEFAULT_FLOOR.toString())))
                .andExpect(jsonPath("$.[*].location").value(hasItem(DEFAULT_LOCATION.toString())))
                .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
                .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY.toString())));
    }

    @Test
    @Transactional
    public void getTenant() throws Exception {
        // Initialize the database
        tenantRepository.saveAndFlush(tenant);

        // Get the tenant
        restTenantMockMvc.perform(get("/api/tenants/{id}", tenant.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(tenant.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.floor").value(DEFAULT_FLOOR.toString()))
            .andExpect(jsonPath("$.location").value(DEFAULT_LOCATION.toString()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()))
            .andExpect(jsonPath("$.category").value(DEFAULT_CATEGORY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTenant() throws Exception {
        // Get the tenant
        restTenantMockMvc.perform(get("/api/tenants/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTenant() throws Exception {
        // Initialize the database
        tenantRepository.saveAndFlush(tenant);

		int databaseSizeBeforeUpdate = tenantRepository.findAll().size();

        // Update the tenant
        tenant.setName(UPDATED_NAME);
        tenant.setFloor(UPDATED_FLOOR);
        tenant.setLocation(UPDATED_LOCATION);
        tenant.setContent(UPDATED_CONTENT);
        tenant.setCategory(UPDATED_CATEGORY);

        restTenantMockMvc.perform(put("/api/tenants")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(tenant)))
                .andExpect(status().isOk());

        // Validate the Tenant in the database
        List<Tenant> tenants = tenantRepository.findAll();
        assertThat(tenants).hasSize(databaseSizeBeforeUpdate);
        Tenant testTenant = tenants.get(tenants.size() - 1);
        assertThat(testTenant.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTenant.getFloor()).isEqualTo(UPDATED_FLOOR);
        assertThat(testTenant.getLocation()).isEqualTo(UPDATED_LOCATION);
        assertThat(testTenant.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testTenant.getCategory()).isEqualTo(UPDATED_CATEGORY);
    }

    @Test
    @Transactional
    public void deleteTenant() throws Exception {
        // Initialize the database
        tenantRepository.saveAndFlush(tenant);

		int databaseSizeBeforeDelete = tenantRepository.findAll().size();

        // Get the tenant
        restTenantMockMvc.perform(delete("/api/tenants/{id}", tenant.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Tenant> tenants = tenantRepository.findAll();
        assertThat(tenants).hasSize(databaseSizeBeforeDelete - 1);
    }
}
