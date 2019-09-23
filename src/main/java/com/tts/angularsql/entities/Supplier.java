package com.tts.angularsql.entities;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "suppliers")
public class Supplier {


    @Id
    @Column(name = "supplierid")
    private int supplierId;

    @Column(name = "suppliername")
    private String supplierName;

    public Supplier() {

    }

    public Supplier(String supplierName) {
        this.supplierName = supplierName;
    }

    public int getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(int supplierId) {
        this.supplierId = supplierId;
    }

    public String getSupplierName() {
        return supplierName;
    }

    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Supplier supplier = (Supplier) o;
        return supplierId == supplier.supplierId &&
                Objects.equals(supplierName, supplier.supplierName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(supplierId, supplierName);
    }

    @Override
    public String toString() {
        return "Supplier{" +
                "supplierId=" + supplierId +
                ", supplierName='" + supplierName + '\'' +
                '}';
    }
}

