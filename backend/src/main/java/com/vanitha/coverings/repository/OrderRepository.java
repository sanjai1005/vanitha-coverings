package com.vanitha.coverings.repository;

import com.vanitha.coverings.model.CustomerOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<CustomerOrder, Long> {
    List<CustomerOrder> findByUsernameOrderByCreatedAtDesc(String username);
    List<CustomerOrder> findAllByOrderByCreatedAtDesc();
}
