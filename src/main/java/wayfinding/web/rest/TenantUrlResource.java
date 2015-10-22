package wayfinding.web.rest;

import com.codahale.metrics.annotation.Timed;
import wayfinding.domain.TenantUrl;
import wayfinding.repository.TenantUrlRepository;
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
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TenantUrl.
 */
@RestController
@RequestMapping("/api")
public class TenantUrlResource {

    private final Logger log = LoggerFactory.getLogger(TenantUrlResource.class);

    @Inject
    private TenantUrlRepository tenantUrlRepository;

    /**
     * POST  /tenantUrls -> Create a new tenantUrl.
     */
    @RequestMapping(value = "/tenantUrls",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<TenantUrl> createTenantUrl(@RequestBody TenantUrl tenantUrl) throws URISyntaxException {
        log.debug("REST request to save TenantUrl : {}", tenantUrl);
        if (tenantUrl.getId() != null) {
            return ResponseEntity.badRequest().header("Failure", "A new tenantUrl cannot already have an ID").body(null);
        }
        TenantUrl result = tenantUrlRepository.save(tenantUrl);
        return ResponseEntity.created(new URI("/api/tenantUrls/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert("tenantUrl", result.getId().toString()))
                .body(result);
    }

    /**
     * PUT  /tenantUrls -> Updates an existing tenantUrl.
     */
    @RequestMapping(value = "/tenantUrls",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<TenantUrl> updateTenantUrl(@RequestBody TenantUrl tenantUrl) throws URISyntaxException {
        log.debug("REST request to update TenantUrl : {}", tenantUrl);
        if (tenantUrl.getId() == null) {
            return createTenantUrl(tenantUrl);
        }
        TenantUrl result = tenantUrlRepository.save(tenantUrl);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert("tenantUrl", tenantUrl.getId().toString()))
                .body(result);
    }

    /**
     * GET  /tenantUrls -> get all the tenantUrls.
     */
    @RequestMapping(value = "/tenantUrls",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<TenantUrl>> getAllTenantUrls(Pageable pageable)
        throws URISyntaxException {
        Page<TenantUrl> page = tenantUrlRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/tenantUrls");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /tenantUrls/:id -> get the "id" tenantUrl.
     */
    @RequestMapping(value = "/tenantUrls/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<TenantUrl> getTenantUrl(@PathVariable Long id) {
        log.debug("REST request to get TenantUrl : {}", id);
        return Optional.ofNullable(tenantUrlRepository.findOne(id))
            .map(tenantUrl -> new ResponseEntity<>(
                tenantUrl,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /tenantUrls/:id -> delete the "id" tenantUrl.
     */
    @RequestMapping(value = "/tenantUrls/{id}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteTenantUrl(@PathVariable Long id) {
        log.debug("REST request to delete TenantUrl : {}", id);
        tenantUrlRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("tenantUrl", id.toString())).build();
    }
}
