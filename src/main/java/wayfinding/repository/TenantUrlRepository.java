package wayfinding.repository;

import wayfinding.domain.TenantUrl;
import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the TenantUrl entity.
 */
public interface TenantUrlRepository extends JpaRepository<TenantUrl,Long> {

}
