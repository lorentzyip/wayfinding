package wayfinding.web.rest;

import com.codahale.metrics.annotation.Timed;
import wayfinding.domain.Tenant;
import wayfinding.repository.TenantRepository;
import wayfinding.web.rest.util.HeaderUtil;
import wayfinding.web.rest.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Tenant.
 */
@RestController
@RequestMapping("/api")
public class TenantResource {

    private final Logger log = LoggerFactory.getLogger(TenantResource.class);

    @Inject
    private TenantRepository tenantRepository;

    /**
     * POST  /tenants -> Create a new tenant.
     */
    @RequestMapping(value = "/tenants",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Tenant> createTenant(@Valid @RequestBody Tenant tenant) throws URISyntaxException {
        log.debug("REST request to save Tenant : {}", tenant);
        if (tenant.getId() != null) {
            return ResponseEntity.badRequest().header("Failure", "A new tenant cannot already have an ID").body(null);
        }
        Tenant result = tenantRepository.save(tenant);
        return ResponseEntity.created(new URI("/api/tenants/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert("tenant", result.getId().toString()))
                .body(result);
    }

    /**
     * PUT  /tenants -> Updates an existing tenant.
     */
    @RequestMapping(value = "/tenants",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Tenant> updateTenant(@Valid @RequestBody Tenant tenant) throws URISyntaxException {
        log.debug("REST request to update Tenant : {}", tenant);
        if (tenant.getId() == null) {
            return createTenant(tenant);
        }
        Tenant result = tenantRepository.save(tenant);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert("tenant", tenant.getId().toString()))
                .body(result);
    }

    /**
     * GET  /tenants -> get all the tenants.
     */
    @RequestMapping(value = "/tenants",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<Tenant>> getAllTenants(Pageable pageable)
        throws URISyntaxException {
        Page<Tenant> page = tenantRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/tenants");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /tenants/:id -> get the "id" tenant.
     */
    @RequestMapping(value = "/tenants/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Tenant> getTenant(@PathVariable Long id) {
        log.debug("REST request to get Tenant : {}", id);
        return Optional.ofNullable(tenantRepository.findOne(id))
            .map(tenant -> new ResponseEntity<>(
                tenant,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /tenants/:id -> delete the "id" tenant.
     */
    @RequestMapping(value = "/tenants/{id}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteTenant(@PathVariable Long id) {
        log.debug("REST request to delete Tenant : {}", id);
        tenantRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("tenant", id.toString())).build();
    }
}
