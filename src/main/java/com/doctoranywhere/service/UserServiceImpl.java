package com.doctoranywhere.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.doctoranywhere.model.Patient;
import com.doctoranywhere.repository.RedisRepository;
import com.google.firebase.auth.FirebaseAuth;

@Service
public class UserServiceImpl implements UserService {
	
    @Autowired
    private RedisRepository redisRepository;

	@Override
	public void saveUser(String idToken) throws Exception {
		String uid = getUserIdFromIdToken(idToken);
		//System.out.println("User Id :: " + uid);

	}

	public String getUserIdFromIdToken(String idToken) throws Exception {
		String uid = null;
		try {
			uid = FirebaseAuth.getInstance().verifyIdTokenAsync(idToken).get().getUid();
		} catch (InterruptedException | ExecutionException e) {
			throw new Exception("User Not Authenticated");
		}
		return uid;
	}

	@Override
	public List<?> getPatientData() throws Exception {
		// TODO Auto-generated method stub
		List<Patient> plist = (List<Patient>) redisRepository.findAllMultiGet();
    	Map<String,List> map = new HashMap<String,List>();
    	List tmpList,finalList;
    	
    	for(Patient p:plist) {
    	tmpList = new ArrayList();
    	tmpList.add(p.getId());
    	tmpList.add(p.getFirstName());
    	tmpList.add(p.getLastName());
    	tmpList.add(p.getContactNo());
    	tmpList.add(p.getAddress().getId());
    	tmpList.add(p.getAddress().getAddressLine1());
    	tmpList.add(p.getAddress().getAddressLine2());
    	tmpList.add(p.getAddress().getCity());
    	tmpList.add(p.getAddress().getCountry());
    	tmpList.add(p.getAddress().getPostalCode());
    	map.put(p.getId(), tmpList);
    	}
    	
    	finalList = new ArrayList();
    	if(map.size()>0) {
    		Iterator it = map.entrySet().iterator();
    	    while (it.hasNext()) {
    	        Map.Entry pair = (Map.Entry)it.next();
    	        System.out.println(pair.getKey() + " = " + pair.getValue());
    	        finalList.add(pair.getValue());
    	    }
    	}
    	System.out.println(finalList);
        return finalList;
	}

}
