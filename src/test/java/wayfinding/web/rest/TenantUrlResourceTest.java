package wayfinding.web.rest;

import wayfinding.Application;
import wayfinding.domain.TenantUrl;
import wayfinding.repository.TenantUrlRepository;

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
 * Test class for the TenantUrlResource REST controller.
 *
 * @see TenantUrlResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest
public class TenantUrlResourceTest {


    private static final Long DEFAULT_TENANT = 1L;
    private static final Long UPDATED_TENANT = 2L;
    private static final String DEFAULT_URL = "AAAAA";
    private static final String UPDATED_URL = "BBBBB";

    @Inject
    private TenantUrlRepository tenantUrlRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restTenantUrlMockMvc;

    private TenantUrl tenantUrl;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        TenantUrlResource tenantUrlResource = new TenantUrlResource();
        ReflectionTestUtils.setField(tenantUrlResource, "tenantUrlRepository", tenantUrlRepository);
        this.restTenantUrlMockMvc = MockMvcBuilders.standaloneSetup(tenantUrlResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        tenantUrl = new TenantUrl();
        tenantUrl.setTenant(DEFAULT_TENANT);
        tenantUrl.setUrl(DEFAULT_URL);
    }

    @Test
    @Transactional
    public void createTenantUrl() throws Exception {
        int databaseSizeBeforeCreate = tenantUrlRepository.findAll().size();

        // Create the TenantUrl

        restTenantUrlMockMvc.perform(post("/api/tenantUrls")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(tenantUrl)))
                .andExpect(status().isCreated());

        // Validate the TenantUrl in the database
        List<TenantUrl> tenantUrls = tenantUrlRepository.findAll();
        assertThat(tenantUrls).hasSize(databaseSizeBeforeCreate + 1);
        TenantUrl testTenantUrl = tenantUrls.get(tenantUrls.size() - 1);
        assertThat(testTenantUrl.getTenant()).isEqualTo(DEFAULT_TENANT);
        assertThat(testTenantUrl.getUrl()).isEqualTo(DEFAULT_URL);
    }

    @Test
    @Transactional
    public void getAllTenantUrls() throws Exception {
        // Initialize the database
        tenantUrlRepository.saveAndFlush(tenantUrl);

        // Get all the tenantUrls
        restTenantUrlMockMvc.perform(get("/api/tenantUrls"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(tenantUrl.getId().intValue())))
                .andExpect(jsonPath("$.[*].tenant").value(hasItem(DEFAULT_TENANT.intValue())))
                .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL.toString())));
    }

    @Test
    @Transactional
    public void getTenantUrl() throws Exception {
        // Initialize the database
        tenantUrlRepository.saveAndFlush(tenantUrl);

        // Get the tenantUrl
        restTenantUrlMockMvc.perform(get("/api/tenantUrls/{id}", tenantUrl.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(tenantUrl.getId().intValue()))
            .andExpect(jsonPath("$.tenant").value(DEFAULT_TENANT.intValue()))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTenantUrl() throws Exception {
        // Get the tenantUrl
        restTenantUrlMockMvc.perform(get("/api/tenantUrls/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTenantUrl() throws Exception {
        // Initialize the database
        tenantUrlRepository.saveAndFlush(tenantUrl);

		int databaseSizeBeforeUpdate = tenantUrlRepository.findAll().size();

        // Update the tenantUrl
        tenantUrl.setTenant(UPDATED_TENANT);
        tenantUrl.setUrl(UPDATED_URL);

        restTenantUrlMockMvc.perform(put("/api/tenantUrls")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(tenantUrl)))
                .andExpect(status().isOk());

        // Validate the TenantUrl in the database
        List<TenantUrl> tenantUrls = tenantUrlRepository.findAll();
        assertThat(tenantUrls).hasSize(databaseSizeBeforeUpdate);
        TenantUrl testTenantUrl = tenantUrls.get(tenantUrls.size() - 1);
        assertThat(testTenantUrl.getTenant()).isEqualTo(UPDATED_TENANT);
        assertThat(testTenantUrl.getUrl()).isEqualTo(UPDATED_URL);
    }

    @Test
    @Transactional
    public void deleteTenantUrl() throws Exception {
        // Initialize the database
        tenantUrlRepository.saveAndFlush(tenantUrl);

		int databaseSizeBeforeDelete = tenantUrlRepository.findAll().size();

        // Get the tenantUrl
        restTenantUrlMockMvc.perform(delete("/api/tenantUrls/{id}", tenantUrl.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<TenantUrl> tenantUrls = tenantUrlRepository.findAll();
        assertThat(tenantUrls).hasSize(databaseSizeBeforeDelete - 1);
    }
}
