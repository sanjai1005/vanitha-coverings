package com.vanitha.coverings.repository;

import com.vanitha.coverings.model.Requirement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RequirementRepository extends JpaRepository<Requirement, Long> {
    List<Requirement> findAllByOrderByCreatedAtDesc();
}
