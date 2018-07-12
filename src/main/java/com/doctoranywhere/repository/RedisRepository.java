package com.doctoranywhere.repository;

import java.util.List;
import java.util.Map;

import com.doctoranywhere.model.Patient;

public interface RedisRepository {

    /**
     * Return all movies
     */
    Map<Object, Object> findAllPatients();

    /**
     * Add key-value pair to Redis.
     */
    void add(Patient patient);

    /**
     * Delete a key-value pair in Redis.
     */
    void delete(String id);
    
    /**
     * find a movie
     */
    Patient findPatient(String id);
    
    List<Patient> findAllPatientsList();
    
    List<Patient> findAllMultiGet();
    
    void update(Patient patient);
}
