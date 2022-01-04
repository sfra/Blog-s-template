package com.example.tests;

import com.thoughtworks.selenium.Selenium;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.WebDriver;
import com.thoughtworks.selenium.webdriven.WebDriverBackedSelenium;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;
import java.util.regex.Pattern;
import static org.apache.commons.lang3.StringUtils.join;

public class 01 {
	private Selenium selenium;

	@Before
	public void setUp() throws Exception {
		WebDriver driver = new FirefoxDriver();
		String baseUrl = "http://localhost/";
		selenium = new WebDriverBackedSelenium(driver, baseUrl);
	}

	@Test
	public void test01() throws Exception {
		selenium.open("/mexico3/template/");
		selenium.click("id=main-menu-button");
	}

	@After
	public void tearDown() throws Exception {
		selenium.stop();
	}
}
