package wayfinding.repository;

import wayfinding.domain.Tenant;
import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Tenant entity.
 */
public interface TenantRepository extends JpaRepository<Tenant,Long> {

}
