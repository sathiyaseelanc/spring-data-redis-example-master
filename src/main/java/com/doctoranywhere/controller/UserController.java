package com.doctoranywhere.controller;

import java.util.List;

import javax.security.auth.login.Configuration.Parameters;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.doctoranywhere.service.UserService;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;


@RestController
public class UserController {
	
	@Autowired
	UserService service;
	
	
	@RequestMapping(method = RequestMethod.POST, value = "/user/save")
	public void save(@RequestHeader(value="ID-TOKEN") String idToken) throws Exception {
		service.saveUser(idToken);
	}
	
	@RequestMapping(value = "/api/restCall", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
	public Object restCall(@RequestBody Parameters requestBody,@RequestHeader(value = "ID-TOKEN", required = true) String idToken) throws Exception {

	    // idToken comes from the HTTP Header
	    FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdTokenAsync(idToken).get();
	    final String uid = decodedToken.getUid();

	    // process the code here
	    // once it is done
	    return uid;

	}
	
	@RequestMapping(value = "/api/rest/patient-data", method = RequestMethod.GET)
	//public @ResponseBody List<?> patientData(@RequestHeader(value = "ID-TOKEN", required = true) String idToken) throws Exception {
	public @ResponseBody List<?> patientData() throws Exception {
		//System.out.println("idToken:"+idToken);
		
		/*if (!FirebaseApp.getApps().isEmpty())
	        FirebaseDatabase.getInstance().setPersistenceEnabled(true);
		
	    // idToken comes from the HTTP Header
	    FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdTokenAsync(idToken).get();
	    final String uid = decodedToken.getUid();

	    System.out.println("uid:"+uid);*/
	    // process the code here
	    // once it is done
	   // return uid;
		
		List list = service.getPatientData();
	    return list;

	}

}
