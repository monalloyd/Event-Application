package com.monalloyd.backend.model;

import jakarta.persistence.*;

@Entity
@Table(uniqueConstraints = { @UniqueConstraint(
        columnNames = { "street", "zipcode", "state", "city", "country" }) })
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String street;
    private String zipcode;
    private String state;
    private String city;
    private String country;

    public Location() {}

    public Location(Long id, String street, String zipcode, String state, String city, String country) {
        this.id = id;
        this.street = street;
        this.zipcode = zipcode;
        this.state = state;
        this.city = city;
        this.country = country;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getZipcode() {
        return zipcode;
    }

    public void setZipcode(String zipcode) {
        this.zipcode = zipcode;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }
}
