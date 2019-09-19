package com.tts.angularsql.dao;

import com.tts.angularsql.entities.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SupplierRepository extends JpaRepository<Supplier, Integer> {
    List<Supplier> findBySupplierId(@Param("id") Supplier supplierId);
    List<Supplier> findBySupplierName(@Param("name") Supplier supplierName);
}

