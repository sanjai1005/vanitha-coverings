package com.vanitha.coverings.repository;

import com.vanitha.coverings.model.Jewel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface JewelRepository extends JpaRepository<Jewel, Long> {
    List<Jewel> findByCategory(String category);
    List<Jewel> findByCategoryStartsWith(String categoryPrefix);
}
