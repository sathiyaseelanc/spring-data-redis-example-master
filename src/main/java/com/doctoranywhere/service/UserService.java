package com.doctoranywhere.service;

import java.util.List;

public interface UserService {

	public void saveUser(String idToken) throws Exception;
	
	public List<?> getPatientData() throws Exception;

}
