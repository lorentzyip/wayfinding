package wayfinding.web.rest;

import com.codahale.metrics.annotation.Timed;
import wayfinding.domain.Promotion;
import wayfinding.repository.PromotionRepository;
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
 * REST controller for managing Promotion.
 */
@RestController
@RequestMapping("/api")
public class PromotionResource {

    private final Logger log = LoggerFactory.getLogger(PromotionResource.class);

    @Inject
    private PromotionRepository promotionRepository;

    /**
     * POST  /promotions -> Create a new promotion.
     */
    @RequestMapping(value = "/promotions",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Promotion> createPromotion(@RequestBody Promotion promotion) throws URISyntaxException {
        log.debug("REST request to save Promotion : {}", promotion);
        if (promotion.getId() != null) {
            return ResponseEntity.badRequest().header("Failure", "A new promotion cannot already have an ID").body(null);
        }
        Promotion result = promotionRepository.save(promotion);
        return ResponseEntity.created(new URI("/api/promotions/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert("promotion", result.getId().toString()))
                .body(result);
    }

    /**
     * PUT  /promotions -> Updates an existing promotion.
     */
    @RequestMapping(value = "/promotions",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Promotion> updatePromotion(@RequestBody Promotion promotion) throws URISyntaxException {
        log.debug("REST request to update Promotion : {}", promotion);
        if (promotion.getId() == null) {
            return createPromotion(promotion);
        }
        Promotion result = promotionRepository.save(promotion);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert("promotion", promotion.getId().toString()))
                .body(result);
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

    /**
     * GET  /promotions/:id -> get the "id" promotion.
     */
    @RequestMapping(value = "/promotions/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Promotion> getPromotion(@PathVariable Long id) {
        log.debug("REST request to get Promotion : {}", id);
        return Optional.ofNullable(promotionRepository.findOne(id))
            .map(promotion -> new ResponseEntity<>(
                promotion,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /promotions/:id -> delete the "id" promotion.
     */
    @RequestMapping(value = "/promotions/{id}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deletePromotion(@PathVariable Long id) {
        log.debug("REST request to delete Promotion : {}", id);
        promotionRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("promotion", id.toString())).build();
    }
}
