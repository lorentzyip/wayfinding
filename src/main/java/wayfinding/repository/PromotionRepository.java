package wayfinding.repository;

import wayfinding.domain.Promotion;
import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Promotion entity.
 */
public interface PromotionRepository extends JpaRepository<Promotion,Long> {

}
