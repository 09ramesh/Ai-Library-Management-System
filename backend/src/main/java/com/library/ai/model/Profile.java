package com.library.ai.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class Profile {
    private String email;
    private Long phone;
    private String address;

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Long getPhone() { return phone; }
    public void setPhone(Long phone) { this.phone = phone; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
}
