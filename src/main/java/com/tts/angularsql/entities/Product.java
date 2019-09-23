package com.tts.angularsql.entities;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "productname")
    private String productName;

    @ManyToOne
    @JoinColumn(name="category")
    private Category category;

    @Column(name = "fullprice")
    private double fullPrice;

    @Column(name = "saleprice")
    private double salePrice;

    @Column(name = "availability")
    private boolean availability;

    @ManyToOne
    @JoinColumn(name = "supplier")
    private Supplier supplier;

    public Product() {}

    public Product(String productName, Category category, double fullPrice, double salePrice, boolean availability, Supplier supplier) {
        this.productName = productName;
        this.category = category;
        this.fullPrice = fullPrice > salePrice ? fullPrice : salePrice;
        System.out.println(this.fullPrice);
        this.salePrice = salePrice < fullPrice ? salePrice : fullPrice;
        this.availability = availability;
        this.supplier = supplier;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public double getFullPrice() {
        return fullPrice;
    }

    public void setFullPrice(double fullPrice) {
        this.fullPrice = fullPrice;
    }

    public double getSalePrice() {
        return salePrice;
    }

    public void setSalePrice(double salePrice) {
        this.salePrice = salePrice;
    }

    public boolean isAvailability() {
        return availability;
    }

    public void setAvailability(boolean availability) {
        this.availability = availability;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product product = (Product) o;
        return id == product.id &&
                category == product.category &&
                Double.compare(product.fullPrice, fullPrice) == 0 &&
                Double.compare(product.salePrice, salePrice) == 0 &&
                availability == product.availability &&
                supplier == product.supplier &&
                Objects.equals(productName, product.productName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, productName, category, fullPrice, salePrice, availability, supplier);
    }

    @Override
    public String toString() {
        return "Product{" +
                "Id=" + id +
                ", productName='" + productName + '\'' +
                ", category=" + category +
                ", fullPrice=" + fullPrice +
                ", salePrice=" + salePrice +
                ", availability=" + availability +
                ", supplier=" + supplier +
                '}';
    }
}
