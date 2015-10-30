package wayfinding.web.rest;

import com.codahale.metrics.annotation.Timed;
import wayfinding.domain.Promotion;
import wayfinding.domain.Tenant;
import wayfinding.repository.PromotionRepository;
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
 * REST controller for Touch screen.
 */
@RestController
@RequestMapping("/api/touch")
public class TouchResource {

    private final Logger log = LoggerFactory.getLogger(TouchResource.class);

    @Inject
    private TenantRepository tenantRepository;

    @Inject
    private PromotionRepository promotionRepository;


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
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/touch/tenants");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /promotions -> get all the promotions.
     */
    @RequestMapping(value = "/promotions",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<Promotion>> getAllPromotions(Pageable pageable)
        throws URISyntaxException {
        Page<Promotion> page = promotionRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/promotions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
