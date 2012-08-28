package com.wikia.webdriver.PageObjects.PageObject;

import org.openqa.selenium.Point;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;

import com.wikia.webdriver.Common.Core.CommonFunctions;
import com.wikia.webdriver.Common.Logging.PageObjectLogging;

public class HubBasePageObject extends BasePageObject{
	//Author Michal Nowierski
	@FindBy(css="div.button.scrollleft p") 
	private WebElement RelatedVideosScrollLeft;
	@FindBy(css="div.button.scrollright p") 
	private WebElement RelatedVideosScrollRight;
	@FindBy(css="form.WikiaSearch input[name='search']") 
	private WebElement SearchField;
	@FindBy(css="form.WikiaSearch button.wikia-button") 
	private WebElement SearchButton;
	
	By MosaicSliderLargeImageDescription = By.cssSelector("div.wikia-mosaic-slider-description span.description-more");
	
	
	public HubBasePageObject(WebDriver driver) {
		super(driver);
		PageFactory.initElements(driver, this);
	}

	public void ClickOnNewsTab(int TabNumber) {
		PageObjectLogging.log("ClickOnNewsTab", "Click on news tab number "+TabNumber+".", true, driver);
		List<WebElement> newstabs = driver.findElements(By.cssSelector("section.wikiahubs-newstabs ul.tabbernav li a"));
		waitForElementClickableByCss("section.wikiahubs-newstabs ul.tabbernav li a");
		newstabs.get(TabNumber - 1).click();

	}
	public void RelatedVideosScrollLeft() {
		PageObjectLogging.log("RelatedVideosScrollLeft", "RV module: scroll left", true, driver);
		RelatedVideosScrollLeft.click();
		}
	
	public void RelatedVideosScrollRight() {
		PageObjectLogging.log("RelatedVideosScrollRight", "RV module: scroll right", true, driver);
		RelatedVideosScrollRight.click();
	}
	public HomePageObject BackToHomePage() {
		PageObjectLogging.log("navigate to www.wikia.com", "", true, driver);
		return new HomePageObject(driver);
	}

	/**
	 * Allows to type into a search filed the given SearchString
	 * <p>
	 * This method is global for all WikiaSearch forms on all of the wikis
	 *
	 * @author Michal Nowierski
	 * @param  SearchString  Specifies what you want to search for
	 */
	public void SearchFieldTypeIn(String SearchString) {
		PageObjectLogging.log("Type " + SearchString
				+ " String into the search field ", "", true, driver);
		SearchField.sendKeys(SearchString);
		}

	/**
	 * Allows to left click on search button in order to initiate searching.
	 * <p>
	 * This method is global for all WikiaSearch forms on all of the wikis
	 * The method should be invoked after SearchFieldType method
	 *
	 * @author Michal Nowierski
	 * @param  SearchString  Specifies what you want to search for
	 */
	public void SearchButtonClick() {
		PageObjectLogging.log("Left click on the WikiaSearch button", "", true, driver);
		SearchButton.click();
		
		
	}
	
	public void MosaicSliderVerifyHasImages() {
		PageObjectLogging.log("MosaicSliderVerifyHasImages", "Verify that WikiaMosaicSlider has images", true, driver);
		List<WebElement> WikiaMosaicSliderPanoramaImages = driver.findElements(By.cssSelector("div.wikia-mosaic-slider-panorama"));
		List<WebElement> WikiaMosaicSliderThumbRegionImages = driver.findElements(By.cssSelector("ul.wikia-mosaic-thumb-region img"));
		waitForElementByElement(WikiaMosaicSliderPanoramaImages.get(0));
		for (int i = 0; i < 5; i++) {
			waitForElementByElement(WikiaMosaicSliderThumbRegionImages.get(i));
		}
	}
	
	/**
	 * Verifies that the given URL is one of the searching process results. You must be 100% sure that the URL will be found after searching
	 * <p>
	 * The method should be invoked after SearchButtonClick method
	 *
	 * @author Michal Nowierski
	 * @param  URL  Specifies what URL you expect as 100% sure result of searching
	 */
	protected void SearchResultsVerifyFoundURL(String URL) {
		PageObjectLogging.log("Verify if " + URL
				+ " URL is one of found the results", "", true, driver);
		
			wait.until(ExpectedConditions.visibilityOfElementLocated(By
					.cssSelector("li.result a[href='"+URL+"']")));

		
	}

	/**
	 * Hover Over Image number 'n'on Mosaic Slider
	 * 
	 * @param  n number of the image n={1,2,3,4,5}
	 * @author Michal Nowierski
	 */
	public void MosaicSliderHoverOverImage(int n) {
		PageObjectLogging.log("MosaicSliderHoverOverImage", "MosaicSlider: Hover over image number"+n, true, driver);
		if (n>5) {
			PageObjectLogging.log("MosaicSliderHoverOverImage", "MosaicSlider: The n parameter must be less than 5. It can not be: n = "+n, false, driver);
			return;
		}
		waitForElementByBy(By.cssSelector("ul.wikia-mosaic-thumb-region img"));
		List<WebElement> WikiaMosaicSliderPanoramaImages = driver.findElements(By.cssSelector("div.wikia-mosaic-slider-panorama"));
		List<WebElement> WikiaMosaicSliderThumbRegionImages = driver.findElements(By.cssSelector("ul.wikia-mosaic-thumb-region img"));
		waitForElementByElement(WikiaMosaicSliderThumbRegionImages.get(n-1));
		Point ImageLocation = WikiaMosaicSliderThumbRegionImages.get(n-1).getLocation();
		CommonFunctions.MoveCursorToElement(ImageLocation);
		
	}

	/**
	 * Get title of current LargeImage on Mosaic Slider
	 * 
	 * @author Michal Nowierski
	 */
	public String MosaicSliderGetCurrentLargeImageDescription() {
		PageObjectLogging.log("MosaicSliderGetCurrentLargeImage", "Get title of current LargeImage on Mosaic Slider", true, driver);
		WebElement MosaicSliderLargeImageDesc = driver.findElement(MosaicSliderLargeImageDescription);
		waitForElementByElement(MosaicSliderLargeImageDesc);
		String description = MosaicSliderLargeImageDesc.getText();
		return description;
	}
	
	/**
	 * Verify that Large Image has changed (by verifying description change), and get the current description
	 * 
	 * @param  n number of the image n={1,2,3,4,5}
	 * @author Michal Nowierski
	 */
	public String MosaicSliderVerifyLargeImageChangeAndGetCurrentDescription(
			String PreviousLargeImageDescription) {
		PageObjectLogging.log("MosaicSliderVerifyLargeImageChangeAndGetCurrentDescription", "Verify that Large Image has changed", true, driver);
		String CurrentDescription = MosaicSliderGetCurrentLargeImageDescription();
		if (CurrentDescription.equals(PreviousLargeImageDescription)) {
			PageObjectLogging.log("MosaicSliderVerifyLargeImageChangeAndGetCurrentDescription", "Large Image hasn't changed", false, driver);
			
		}
		return CurrentDescription;
	}

}
































