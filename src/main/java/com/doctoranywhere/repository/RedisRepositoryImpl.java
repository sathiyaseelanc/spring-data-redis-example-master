package com.doctoranywhere.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import com.doctoranywhere.model.Patient;

@Repository
public class RedisRepositoryImpl implements RedisRepository {
    private static final String KEY = "Patient";
    
    private RedisTemplate<String, Object> redisTemplate;
    private HashOperations hashOperations;
    
    @Autowired
    public RedisRepositoryImpl(RedisTemplate<String, Object> redisTemplate){
        this.redisTemplate = redisTemplate;
    }

    @PostConstruct
    private void init(){
        hashOperations = redisTemplate.opsForHash();
    }
    
    public void add(final Patient patient) {
        //hashOperations.put(KEY, patient.getId(), patient.getFirstName(),patient.getLastName(),patient.getContactNo(),patient.getAddress());
    	hashOperations.put(KEY, patient.getId(), patient);
    }

    public void delete(final String id) {
        hashOperations.delete(KEY, id);
    }
    
    public Patient findPatient(final String id){
        return (Patient) hashOperations.get(KEY, id);
    }
    
    public Map<Object, Object> findAllPatients(){
        return hashOperations.entries(KEY);
    }
    
    public List<Patient> findAllPatientsList(){
        return hashOperations.values(KEY);
    }
    
    public List<Patient> findAllMultiGet(){
        List<String> list = new ArrayList<>();
    	list.add("key1");
    	list.add("firstName");
    	list.add("lastName");
    	list.add("contactNo");
    	list.add("addressType");
    	list.add("addressLine1");
    	list.add("addressLine2");
    	list.add("city");
    	list.add("country");
    	list.add("key3");
    	
    	Set set=hashOperations.keys(KEY);
    	System.out.println("sathiya set:"+set);
    	return hashOperations.multiGet(KEY, set);
    }
    
    @Override
	public void update(Patient patient) {
		hashOperations.put(KEY, patient.getId(), patient);
	}

}
