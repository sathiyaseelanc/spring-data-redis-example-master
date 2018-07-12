package com.doctoranywhere;

import java.io.IOException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.io.ClassPathResource;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;


@SpringBootApplication
public class RedisApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(RedisApplication.class, args);
        
        try {
			FirebaseOptions options = new FirebaseOptions.Builder()
			  .setCredentials(GoogleCredentials.fromStream(new ClassPathResource("firebase-authentication.json").getInputStream()))
			  .setDatabaseUrl("https://sathiya-project.firebaseio.com")
			  .build();
			FirebaseApp.initializeApp(options);
		} catch (IOException e) {
			e.printStackTrace();
		}
    	
    }
}
