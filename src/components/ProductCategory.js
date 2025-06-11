import React, { useState, useEffect } from "react";
// import "./General.css";
// import { useProductContext } from "../../productContex";
// import { X } from "lucide-react"
// import { Link } from "react-router-dom"
import { useProductContext } from "../productContex";

const ProductCategory = ({ onCategoriesChange }) => {

  //   const [description, setDescription] = useState("");
  //   const [isRefundable, setIsRefundable] = useState(false);
  //   const [isFeatured, setIsFeatured] = useState(false);
  //   const [isTodaysDeal, setIsTodaysDeal] = useState(false);
  //   const [flashTitle, setFlashTitle] = useState("");
  //   const [discount, setDiscount] = useState(0);
  //   const [discountType, setDiscountType] = useState("");
  //   const [tax, setTax] = useState(0);
  //   const [taxType, setTaxType] = useState("flat");
  //   const [vat, setVat] = useState(0);
  //   const [vatType, setVatType] = useState("flat");
  //   const [content, setContent] = useState("");
  //   const [tagInput, setTagInput] = useState("");
  //   // const [showHotCategories, setShowHotCategories] = useState(false);

  //   // const toggleHotCategories = () => {
  //   //   setShowHotCategories(!showHotCategories);
  //   // };


  const [showWomenCategories, setShowWomenCategories] = useState(false);
  const [showWomenSubCategories, setShowWomenSubCategories] = useState(false);
  const [showMenCategories, setShowMenCategories] = useState(false);
  const [showMenSubCategories, setShowMenSubCategories] = useState(false);
  const [showOutwearCategories, setShowOutwearCategories] = useState(false);
  const [showUnderwearCategories, setShowUnderwearCategories] = useState(false);
  const [showComputerCategories, setShowComputerCategories] = useState(false);
  const [showLaptopCategories, setShowLaptopCategories] = useState(false);
  const [showGamingPCCategories, setShowGamingPCCategories] = useState(false);
  const [showOfficialEquipmentCategories, setShowOfficialEquipmentCategories] = useState(false);
  const [showComponentsCategories, setShowComponentsCategories] = useState(false);
  const [ShowautoMobiles, setShowAutoMobiles] = useState(false);
  const [showRacingCars, setShowRacingCars] = useState(false);
  const [showFourSeaterSedans, setShowFourSeaterSedans] = useState(false);
  const [showSUVs, setShowSUVs] = useState(false);
  const [showMotorBikes, setShowMotorBikes] = useState(false);
  const [showKidsToys, setShowKidsToys] = useState(false);
  const [showBabyClothing, setShowBabyClothing] = useState(false);
  const [showBoysClothing, setShowBoysClothing] = useState(false);
  const [showGirlsClothing, setShowGirlsClothing] = useState(false);
  const [showShoesBags, setShowShoesBags] = useState(false);
  const [showBabyMother, setShowBabyMother] = useState(false);
  const [showSportsOutdoor, setShowSportsOutdoor] = useState(false);
  const [showSwimming, setShowSwimming] = useState(false);
  const [showCycling, setShowCycling] = useState(false);
  const [showSneakers, setShowSneakers] = useState(false);
  const [showFishing, setShowFishing] = useState(false);

  const [showJewelryWatches, setShowJewelryWatches] = useState(false);
  const [showWeddingEngagement, setShowWeddingEngagement] = useState(false);
  const [showMensWatches, setShowMensWatches] = useState(false);
  const [showWomensWatches, setShowWomensWatches] = useState(false);
  const [showFashionJewelry, setShowFashionJewelry] = useState(false);
  const [showCellphonesTabs, setShowCellphonesTabs] = useState(false);
  const [showMobilePhones, setShowMobilePhones] = useState(false);
  const [showMobilePhoneParts, setShowMobilePhoneParts] = useState(false);
  const [showMobilePhoneAccessories, setShowMobilePhoneAccessories] = useState(false);
  const [showTabletsAccessories, setShowTabletsAccessories] = useState(false);
  const [showBeautyHealthHair, setShowBeautyHealthHair] = useState(false);
  const [showMakeup, setShowMakeup] = useState(false);
  const [showSkinCare, setShowSkinCare] = useState(false);
  const [showNailArtTools, setShowNailArtTools] = useState(false);
  const [showHomeImprovementTools, setShowHomeImprovementTools] = useState(false);
  const [showIndoorLighting, setShowIndoorLighting] = useState(false);
  const [showOutdoorLighting, setShowOutdoorLighting] = useState(false);
  const [showLEDLighting, setShowLEDLighting] = useState(false);
  const [showHomeDecorationAppliance, setShowHomeDecorationAppliance] = useState(false);
  const [showHomeDecor, setShowHomeDecor] = useState(false);
  const [showHomeTextile, setShowHomeTextile] = useState(false);
  const [showFurniture, setShowFurniture] = useState(false);
  const [showToy, setShowToy] = useState(false);


  // const toggleToy = () => setShowToy(!showToy);

  // const toggleHomeDecorationAppliance = () => setShowHomeDecorationAppliance(!showHomeDecorationAppliance);
  // const toggleHomeDecor = () => setShowHomeDecor(!showHomeDecor);
  // const toggleHomeTextile = () => setShowHomeTextile(!showHomeTextile);
  // const toggleFurniture = () => setShowFurniture(!showFurniture);

  // // ... (अन्य फंक्शन्स) ...

  // const toggleHomeImprovementTools = () => setShowHomeImprovementTools(!showHomeImprovementTools);
  // const toggleIndoorLighting = () => setShowIndoorLighting(!showIndoorLighting);
  // const toggleOutdoorLighting = () => setShowOutdoorLighting(!showOutdoorLighting);
  // const toggleLEDLighting = () => setShowLEDLighting(!showLEDLighting);

  // // ... (अन्य फंक्शन्स) ...

  // const toggleBeautyHealthHair = () => setShowBeautyHealthHair(!showBeautyHealthHair);
  // const toggleMakeup = () => setShowMakeup(!showMakeup);
  // const toggleSkinCare = () => setShowSkinCare(!showSkinCare);
  // const toggleNailArtTools = () => setShowNailArtTools(!showNailArtTools);

  // ... (अन्य फंक्शन्स) ...

  const toggleCellphonesTabs = () => setShowCellphonesTabs(!showCellphonesTabs);
  const toggleMobilePhones = () => setShowMobilePhones(!showMobilePhones);
  const toggleMobilePhoneParts = () => setShowMobilePhoneParts(!showMobilePhoneParts);
  const toggleMobilePhoneAccessories = () => setShowMobilePhoneAccessories(!showMobilePhoneAccessories);
  const toggleTabletsAccessories = () => setShowTabletsAccessories(!showTabletsAccessories);

  // ... (अन्य फंक्शन्स) ...

  // const toggleJewelryWatches = () => setShowJewelryWatches(!showJewelryWatches);
  // const toggleWeddingEngagement = () => setShowWeddingEngagement(!showWeddingEngagement);
  // const toggleMensWatches = () => setShowMensWatches(!showMensWatches);
  // const toggleWomensWatches = () => setShowWomensWatches(!showWomensWatches);
  // const toggleFashionJewelry = () => setShowFashionJewelry(!showFashionJewelry);




  // const toggleSportsOutdoor = () => setShowSportsOutdoor(!showSportsOutdoor);
  // const toggleSwimming = () => setShowSwimming(!showSwimming);
  // const toggleCycling = () => setShowCycling(!showCycling);
  // const toggleSneakers = () => setShowSneakers(!showSneakers);
  // const toggleFishing = () => setShowFishing(!showFishing);

  // const toggleKidsToys = () => setShowKidsToys(!showKidsToys);
  // const toggleBabyClothing = () => setShowBabyClothing(!showBabyClothing);
  // const toggleBoysClothing = () => setShowBoysClothing(!showBoysClothing);
  // const toggleGirlsClothing = () => setShowGirlsClothing(!showGirlsClothing);
  // const toggleShoesBags = () => setShowShoesBags(!showShoesBags);
  // const toggleBabyMother = () => setShowBabyMother(!showBabyMother);


  const toggleautomobiles = () => {
    setShowAutoMobiles(!ShowautoMobiles);
  };

  const toggleRacingCars = () => {
    setShowRacingCars(!showRacingCars);
  };

  const toggleFourSeaterSedans = () => {
    setShowFourSeaterSedans(!showFourSeaterSedans);
  };

  const toggleSUVs = () => {
    setShowSUVs(!showSUVs);
  };

  const toggleMotorBikes = () => {
    setShowMotorBikes(!showMotorBikes);
  };


  const toggleLaptopCategories = () => setShowLaptopCategories(!showLaptopCategories);
  const toggleGamingPCCategories = () => setShowGamingPCCategories(!showGamingPCCategories);
  const toggleOfficialEquipmentCategories = () => setShowOfficialEquipmentCategories(!showOfficialEquipmentCategories);
  const toggleComponentsCategories = () => setShowComponentsCategories(!showComponentsCategories);


  const toggleWomenCategories = () => {
    setShowWomenCategories(!showWomenCategories);
    setShowWomenSubCategories(false);
  };

  const toggleWomenSubCategories = () => {
    setShowWomenSubCategories(!showWomenSubCategories);
  };

  const toggleMenCategories = () => {
    setShowMenCategories(!showMenCategories);
    setShowMenSubCategories(false);
  };

  const toggleMenSubCategories = () => {
    setShowMenSubCategories(!showMenSubCategories);
  };

  //  const toggleautomobiles = () =>{
  //   setShowautoMobiles(!showautoMobiles)
  //  }


  const toggleOutwearCategories = () => setShowOutwearCategories(!showOutwearCategories);
  const toggleUnderwearCategories = () => setShowUnderwearCategories(!showUnderwearCategories);
  const toggleComputerCategories = () => {
    setShowComputerCategories(!showComputerCategories);
  };

  const [categoryToggles, setCategoryToggles] = useState({});
  // const { productData, setProductData } = useProductContext();
  const { setProductData } = useProductContext();


  const toggleCategory = (categoryKey, categoryLabel) => {
    setCategoryToggles((prev) => ({
      ...prev,
      [categoryKey]: !prev[categoryKey],
    }));

    setProductData((prev) => {
      let updatedCategories = [...prev.frequentlyBought.categories];

      if (!categoryToggles[categoryKey]) {
        if (!updatedCategories.some((cat) => cat.category === categoryLabel)) {
          updatedCategories.push({ category: categoryLabel, subcategories: [] });
        }
      } else {
        updatedCategories = updatedCategories.filter(
          (cat) => cat.category !== categoryLabel
        );
      }

      return {
        ...prev,
        frequentlyBought: {
          ...prev.frequentlyBought,
          categories: updatedCategories,
        },
      };
    });
  };

  const toggleSubcategory = (mainCategory, subLabel, key) => {
    setCategoryToggles((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));

    setProductData((prev) => {
      const updatedCategories = prev.frequentlyBought.categories.map((cat) => {
        if (cat.category === mainCategory) {
          let updatedSub = [...cat.subcategories];

          if (!categoryToggles[key]) {
            if (!updatedSub.includes(subLabel)) {
              updatedSub.push(subLabel);
            }
          } else {
            updatedSub = updatedSub.filter((sub) => sub !== subLabel);
          }

          return { ...cat, subcategories: updatedSub };
        }
        return cat;
      });

      return {
        ...prev,
        frequentlyBought: {
          ...prev.frequentlyBought,
          categories: updatedCategories,
        },
      };
    });
  };



  useEffect(() => {
    const categoryMap = {
      Toys: showToy,
      HomeDecorationAppliance: showHomeDecorationAppliance,
      HomeDecor: showHomeDecor,
      HomeTextile: showHomeTextile,
      Furniture: showFurniture,
      HomeImprovementTools: showHomeImprovementTools,
      IndoorLighting: showIndoorLighting,
      OutdoorLighting: showOutdoorLighting,
      LEDLighting: showLEDLighting,
      BeautyHealthHair: showBeautyHealthHair,
      Makeup: showMakeup,
      SkinCare: showSkinCare,
      NailArtTools: showNailArtTools,
      CellphonesTabs: showCellphonesTabs,
      MobilePhones: showMobilePhones,
      MobilePhoneParts: showMobilePhoneParts,
      MobilePhoneAccessories: showMobilePhoneAccessories,
      TabletsAccessories: showTabletsAccessories,
      JewelryWatches: showJewelryWatches,
      WeddingEngagement: showWeddingEngagement,
      MensWatches: showMensWatches,
      WomensWatches: showWomensWatches,
      FashionJewelry: showFashionJewelry,
      SportsOutdoor: showSportsOutdoor,
      Swimming: showSwimming,
      Cycling: showCycling,
      Sneakers: showSneakers,
      Fishing: showFishing,
      KidsToys: showKidsToys,
      BabyClothing: showBabyClothing,
      BoysClothing: showBoysClothing,
      GirlsClothing: showGirlsClothing,
      ShoesBags: showShoesBags,
      BabyMother: showBabyMother,
      Automobiles: ShowautoMobiles,
      RacingCars: showRacingCars,
      FourSeaterSedans: showFourSeaterSedans,
      SUVs: showSUVs,
      MotorBikes: showMotorBikes,
      LaptopCategories: showLaptopCategories,
      GamingPCCategories: showGamingPCCategories,
      OfficialEquipmentCategories: showOfficialEquipmentCategories,
      ComponentsCategories: showComponentsCategories,
      WomenCategories: showWomenCategories,
      MenCategories: showMenCategories,
      OutwearCategories: showOutwearCategories,
      UnderwearCategories: showUnderwearCategories,
      ComputerCategories: showComputerCategories,
    };

    const selected = Object.entries(categoryMap)
      .filter(([_, isOn]) => isOn)
      .map(([cat]) => cat);

    onCategoriesChange(selected);
  }, [
    showToy,
    showHomeDecorationAppliance,
    showHomeDecor,
    showHomeTextile,
    showFurniture,
    showHomeImprovementTools,
    showIndoorLighting,
    showOutdoorLighting,
    showLEDLighting,
    showBeautyHealthHair,
    showMakeup,
    showSkinCare,
    showNailArtTools,
    showCellphonesTabs,
    showMobilePhones,
    showMobilePhoneParts,
    showMobilePhoneAccessories,
    showTabletsAccessories,
    showJewelryWatches,
    showWeddingEngagement,
    showMensWatches,
    showWomensWatches,
    showFashionJewelry,
    showSportsOutdoor,
    showSwimming,
    showCycling,
    showSneakers,
    showFishing,
    showKidsToys,
    showBabyClothing,
    showBoysClothing,
    showGirlsClothing,
    showShoesBags,
    showBabyMother,
    ShowautoMobiles,
    showRacingCars,
    showFourSeaterSedans,
    showSUVs,
    showMotorBikes,
    showLaptopCategories,
    showGamingPCCategories,
    showOfficialEquipmentCategories,
    showComponentsCategories,
    showWomenCategories,
    showMenCategories,
    showOutwearCategories,
    showUnderwearCategories,
    showComputerCategories,
    onCategoriesChange,   // Add here
  ])


  return (

    <div>
      {/* Right Side - Table-like Category Section */}
      < div className="category-container" >
        <h3 className="mb-3">Product Category</h3>
        <hr className="line"></hr>
        <div className="category-list">
          <ul>
            {/* Women Clothing & Fashion */}
            <li>
              <button className="category-toggle" onClick={toggleWomenCategories}>
                {showWomenCategories ? "-" : "+"}
              </button>
              <input type="checkbox" id="womenClothing" checked={categoryToggles["womenClothing"] || false}
                onChange={() =>
                  toggleCategory("womenClothing", "Women Clothing & Fashion")
                } />
              <label htmlFor="womenClothing">Women Clothing & Fashion</label>
            </li>
            {showWomenCategories && (
              <>
                <li className="sub-category">
                  <button className="category-toggle" onClick={toggleWomenSubCategories}>
                    {showWomenSubCategories ? "-" : "+"}
                  </button>
                  <input type="checkbox" id="hotCategories" checked={categoryToggles["hotCategories"] || false}
                    onChange={() =>
                      toggleSubcategory("Women Clothing & Fashion", "Hot Categories", "hotCategories")
                    } />
                  <label htmlFor="hotCategories">Hot Categories</label>
                </li>
                {showWomenSubCategories && (
                  <>
                    <li className="sub-sub-category">
                      <input type="checkbox" id="partyDress" checked={categoryToggles["partyDress"] || false}
                        onChange={() =>
                          toggleSubcategory("Women Clothing & Fashion", "Party Dress", "partyDress")
                        } />
                      <label htmlFor="partyDress">Party Dress</label>
                    </li>
                    <li className="sub-sub-category">
                      <input type="checkbox" id="beautyHealth" checked={categoryToggles["beautyHealth"] || false}
                        onChange={() =>
                          toggleSubcategory("Women Clothing & Fashion", "Beauty & Health", "beautyHealth")
                        } />
                      <label htmlFor="beautyHealth">Beauty & Health</label>
                    </li>
                  </>
                )}
              </>
            )}

            {/* Men Clothing & Fashion */}
            <li>
              <button className="category-toggle" onClick={toggleMenCategories}>
                {showMenCategories ? "-" : "+"}
              </button>
              <input
                type="checkbox"
                id="menClothing"
                checked={categoryToggles["menClothing"] || false}
                onChange={() => toggleCategory("menClothing", "Men Clothing & Fashion")}
              />
              <label htmlFor="menClothing">Men Clothing & Fashion</label>
            </li>

            {showMenCategories && (
              <>
                {/* Subcategory */}
                <li className="sub-category">
                  <button className="category-toggle" onClick={toggleMenSubCategories}>
                    {showMenSubCategories ? "-" : "+"}
                  </button>
                  <input
                    type="checkbox"
                    id="menHotCategories"
                    checked={categoryToggles["menHotCategories"] || false}
                    onChange={() => toggleSubcategory("Men Clothing & Fashion", "Hot Categories", "menHotCategories")}
                  />
                  <label htmlFor="menHotCategories">Hot Categories</label>
                </li>

                {showMenSubCategories && (
                  <>
                    {/* Outwear & Jackets Section */}
                    <li className="sub-category">
                      <button className="category-toggle" onClick={toggleOutwearCategories}>
                        {showOutwearCategories ? "-" : "+"}
                      </button>
                      <input
                        type="checkbox"
                        id="menOutwearJackets"
                        checked={categoryToggles["menOutwearJackets"] || false}
                        onChange={() => toggleSubcategory("Men Clothing & Fashion", "Outwear & Jackets", "menOutwearJackets")}
                      />
                      <label htmlFor="menOutwearJackets">Outwear & Jackets</label>
                    </li>

                    {showOutwearCategories && (
                      <>
                        <li className="sub-sub-category">
                          <input
                            type="checkbox"
                            id="coats"
                            checked={categoryToggles["coats"] || false}
                            onChange={() => toggleSubcategory("Men Clothing & Fashion", "Coats", "coats")}
                          />
                          <label htmlFor="coats">Coats</label>
                        </li>
                        <li className="sub-sub-category">
                          <input
                            type="checkbox"
                            id="denimJackets"
                            checked={categoryToggles["denimJackets"] || false}
                            onChange={() => toggleSubcategory("Men Clothing & Fashion", "Denim Jackets", "denimJackets")}
                          />
                          <label htmlFor="denimJackets">Denim Jackets</label>
                        </li>
                      </>
                    )}

                    {/* Bottom */}
                    <li className="sub-sub-category">
                      <input
                        type="checkbox"
                        id="menBottom"
                        checked={categoryToggles["menBottom"] || false}
                        onChange={() => toggleSubcategory("Men Clothing & Fashion", "Bottom", "menBottom")}
                      />
                      <label htmlFor="menBottom">Bottom</label>
                    </li>

                    {/* Underwear & Loungewear */}
                    <li className="sub-category">
                      <button className="category-toggle" onClick={toggleUnderwearCategories}>
                        {showUnderwearCategories ? "-" : "+"}
                      </button>
                      <input
                        type="checkbox"
                        id="menUnderwearLoungewear"
                        checked={categoryToggles["menUnderwearLoungewear"] || false}
                        onChange={() => toggleSubcategory("Men Clothing & Fashion", "Underwear & Loungewear Accessories", "menUnderwearLoungewear")}
                      />
                      <label htmlFor="menUnderwearLoungewear">Underwear & Loungewear Accessories</label>
                    </li>

                    {showUnderwearCategories && (
                      <>
                        <li className="sub-sub-category">
                          <input
                            type="checkbox"
                            id="boxers"
                            checked={categoryToggles["boxers"] || false}
                            onChange={() => toggleSubcategory("Men Clothing & Fashion", "Boxers", "boxers")}
                          />
                          <label htmlFor="boxers">Boxers</label>
                        </li>
                        <li className="sub-sub-category">
                          <input
                            type="checkbox"
                            id="sleepwear"
                            checked={categoryToggles["sleepwear"] || false}
                            onChange={() => toggleSubcategory("Men Clothing & Fashion", "Sleepwear", "sleepwear")}
                          />
                          <label htmlFor="sleepwear">Sleepwear</label>
                        </li>
                      </>
                    )}

                    {/* Accessories & Formal Dress */}
                    <li className="sub-sub-category">
                      <input
                        type="checkbox"
                        id="menAccessories"
                        checked={categoryToggles["menAccessories"] || false}
                        onChange={() => toggleSubcategory("Men Clothing & Fashion", "Accessories", "menAccessories")}
                      />
                      <label htmlFor="menAccessories">Accessories</label>
                    </li>
                    <li className="sub-sub-category">
                      <input
                        type="checkbox"
                        id="menFormalDress"
                        checked={categoryToggles["menFormalDress"] || false}
                        onChange={() => toggleSubcategory("Men Clothing & Fashion", "Men Formal Dress", "menFormalDress")}
                      />
                      <label htmlFor="menFormalDress">Men Formal Dress</label>
                    </li>
                  </>
                )}
              </>
            )}


            {/* Other Main Categories */}
            {/* Computer & Accessories */}
            <li>
              <button className="category-toggle" onClick={toggleComputerCategories}>
                {showComputerCategories ? "-" : "+"}
              </button>
              <input
                type="checkbox"
                id="computerAccessories"
                checked={categoryToggles["computerAccessories"] || false}
                onChange={() => toggleCategory("computerAccessories", "Computer & Accessories")}
              />
              <label htmlFor="computerAccessories">Computer & Accessories</label>
            </li>

            {showComputerCategories && (
              <>
                {/* Laptop & Accessories */}
                <li className="sub-category">
                  <button className="category-toggle" onClick={toggleLaptopCategories}>
                    {showLaptopCategories ? "-" : "+"}
                  </button>
                  <input
                    type="checkbox"
                    id="laptopAccessories"
                    checked={categoryToggles["laptopAccessories"] || false}
                    onChange={() => toggleSubcategory("Computer & Accessories", "Laptop & Accessories", "laptopAccessories")}
                  />
                  <label htmlFor="laptopAccessories">Laptop & Accessories</label>
                </li>
                {showLaptopCategories && (
                  <>
                    <li className="sub-sub-category">
                      <input
                        type="checkbox"
                        id="gamingLaptops"
                        checked={categoryToggles["gamingLaptops"] || false}
                        onChange={() => toggleSubcategory("Computer & Accessories", "Gaming Laptops", "gamingLaptops")}
                      />
                      <label htmlFor="gamingLaptops">Gaming Laptops</label>
                    </li>
                    <li className="sub-sub-category">
                      <input
                        type="checkbox"
                        id="businessLaptops"
                        checked={categoryToggles["businessLaptops"] || false}
                        onChange={() => toggleSubcategory("Computer & Accessories", "Business Laptops", "businessLaptops")}
                      />
                      <label htmlFor="businessLaptops">Business Laptops</label>
                    </li>
                  </>
                )}

                {/* Gaming PC */}
                <li className="sub-category">
                  <button className="category-toggle" onClick={toggleGamingPCCategories}>
                    {showGamingPCCategories ? "-" : "+"}
                  </button>
                  <input
                    type="checkbox"
                    id="gamingPC"
                    checked={categoryToggles["gamingPC"] || false}
                    onChange={() => toggleSubcategory("Computer & Accessories", "Gaming PC", "gamingPC")}
                  />
                  <label htmlFor="gamingPC">Gaming PC</label>
                </li>
                {showGamingPCCategories && (
                  <>
                    <li className="sub-sub-category">
                      <input
                        type="checkbox"
                        id="customBuilds"
                        checked={categoryToggles["customBuilds"] || false}
                        onChange={() => toggleSubcategory("Computer & Accessories", "Custom Builds", "customBuilds")}
                      />
                      <label htmlFor="customBuilds">Custom Builds</label>
                    </li>
                    <li className="sub-sub-category">
                      <input
                        type="checkbox"
                        id="preBuiltPCs"
                        checked={categoryToggles["preBuiltPCs"] || false}
                        onChange={() => toggleSubcategory("Computer & Accessories", "Pre-built PCs", "preBuiltPCs")}
                      />
                      <label htmlFor="preBuiltPCs">Pre-built PCs</label>
                    </li>
                  </>
                )}

                {/* Official Equipment */}
                <li className="sub-category">
                  <button className="category-toggle" onClick={toggleOfficialEquipmentCategories}>
                    {showOfficialEquipmentCategories ? "-" : "+"}
                  </button>
                  <input
                    type="checkbox"
                    id="officialEquipment"
                    checked={categoryToggles["officialEquipment"] || false}
                    onChange={() => toggleSubcategory("Computer & Accessories", "Official Equipment", "officialEquipment")}
                  />
                  <label htmlFor="officialEquipment">Official Equipment</label>
                </li>
                {showOfficialEquipmentCategories && (
                  <>
                    <li className="sub-sub-category">
                      <input
                        type="checkbox"
                        id="printers"
                        checked={categoryToggles["printers"] || false}
                        onChange={() => toggleSubcategory("Computer & Accessories", "Printers", "printers")}
                      />
                      <label htmlFor="printers">Printers</label>
                    </li>
                    <li className="sub-sub-category">
                      <input
                        type="checkbox"
                        id="scanners"
                        checked={categoryToggles["scanners"] || false}
                        onChange={() => toggleSubcategory("Computer & Accessories", "Scanners", "scanners")}
                      />
                      <label htmlFor="scanners">Scanners</label>
                    </li>
                  </>
                )}

                {/* Components & Peripherals */}
                <li className="sub-category">
                  <button className="category-toggle" onClick={toggleComponentsCategories}>
                    {showComponentsCategories ? "-" : "+"}
                  </button>
                  <input
                    type="checkbox"
                    id="componentsPeripherals"
                    checked={categoryToggles["componentsPeripherals"] || false}
                    onChange={() => toggleSubcategory("Computer & Accessories", "Components & Peripherals", "componentsPeripherals")}
                  />
                  <label htmlFor="componentsPeripherals">Components & Peripherals</label>
                </li>
                {showComponentsCategories && (
                  <>
                    <li className="sub-sub-category">
                      <input
                        type="checkbox"
                        id="graphicCards"
                        checked={categoryToggles["graphicCards"] || false}
                        onChange={() => toggleSubcategory("Computer & Accessories", "Graphic Cards", "graphicCards")}
                      />
                      <label htmlFor="graphicCards">Graphic Cards</label>
                    </li>
                    <li className="sub-sub-category">
                      <input
                        type="checkbox"
                        id="keyboards"
                        checked={categoryToggles["keyboards"] || false}
                        onChange={() => toggleSubcategory("Computer & Accessories", "Keyboards", "keyboards")}
                      />
                      <label htmlFor="keyboards">Keyboards</label>
                    </li>
                  </>
                )}

                {/* TV & Soundbox */}
                <li className="sub-category">
                  <input
                    type="checkbox"
                    id="tvSoundbox"
                    checked={categoryToggles["tvSoundbox"] || false}
                    onChange={() => toggleSubcategory("Computer & Accessories", "TV & Soundbox", "tvSoundbox")}
                  />
                  <label htmlFor="tvSoundbox">TV & Soundbox</label>
                </li>
              </>
            )}

            <li>
              <button className="category-toggle" onClick={toggleautomobiles}>
                {ShowautoMobiles ? "-" : "+"}
              </button>
              <input
                type="checkbox"
                id="automobileMotorcycle"
                checked={categoryToggles["automobileMotorcycle"] || false}
                onChange={() => toggleCategory("automobileMotorcycle", "Automobile & Motorcycle")}
              />
              <label htmlFor="automobileMotorcycle">Automobile & Motorcycle</label>
            </li>

            {ShowautoMobiles && (
              <>
                {/* Racing Cars */}
                <li className="sub-category">
                  <button className="category-toggle" onClick={toggleRacingCars}>
                    {showRacingCars ? "-" : "+"}
                  </button>
                  <input
                    type="checkbox"
                    id="racingCars"
                    checked={categoryToggles["racingCars"] || false}
                    onChange={() => toggleSubcategory("Automobile & Motorcycle", "Racing car", "racingCars")}
                  />
                  <label htmlFor="racingCars">Racing car</label>
                </li>
                {showRacingCars && (
                  <>
                    <li className="sub-sub-category">
                      <input
                        type="checkbox"
                        id="formula1"
                        checked={categoryToggles["formula1"] || false}
                        onChange={() => toggleSubcategory("Automobile & Motorcycle", "Formula 1", "formula1")}
                      />
                      <label htmlFor="formula1">Formula 1</label>
                    </li>
                    <li className="sub-sub-category">
                      <input
                        type="checkbox"
                        id="nascar"
                        checked={categoryToggles["nascar"] || false}
                        onChange={() => toggleSubcategory("Automobile & Motorcycle", "NASCAR", "nascar")}
                      />
                      <label htmlFor="nascar">NASCAR</label>
                    </li>
                  </>
                )}

                {/* Four Seater Sedan */}
                <li className="sub-category">
                  <button className="category-toggle" onClick={toggleFourSeaterSedans}>
                    {showFourSeaterSedans ? "-" : "+"}
                  </button>
                  <input
                    type="checkbox"
                    id="fourSeaterSedan"
                    checked={categoryToggles["fourSeaterSedan"] || false}
                    onChange={() => toggleSubcategory("Automobile & Motorcycle", "Four Seater Sedan", "fourSeaterSedan")}
                  />
                  <label htmlFor="fourSeaterSedan">Four Seater Sedan</label>
                </li>
                {showFourSeaterSedans && (
                  <>
                    <li className="sub-sub-category">
                      <input
                        type="checkbox"
                        id="sedanFormula1"
                        checked={categoryToggles["sedanFormula1"] || false}
                        onChange={() => toggleSubcategory("Automobile & Motorcycle", "Formula 1", "sedanFormula1")}
                      />
                      <label htmlFor="sedanFormula1">Formula 1</label>
                    </li>
                    <li className="sub-sub-category">
                      <input
                        type="checkbox"
                        id="sedanNascar"
                        checked={categoryToggles["sedanNascar"] || false}
                        onChange={() => toggleSubcategory("Automobile & Motorcycle", "NASCAR", "sedanNascar")}
                      />
                      <label htmlFor="sedanNascar">NASCAR</label>
                    </li>
                  </>
                )}

                {/* SUVs */}
                <li className="sub-category">
                  <button className="category-toggle" onClick={toggleSUVs}>
                    {showSUVs ? "-" : "+"}
                  </button>
                  <input
                    type="checkbox"
                    id="suv"
                    checked={categoryToggles["suv"] || false}
                    onChange={() => toggleSubcategory("Automobile & Motorcycle", "SUV", "suv")}
                  />
                  <label htmlFor="suv">SUV</label>
                </li>
                {showSUVs && (
                  <>
                    <li className="sub-sub-category">
                      <input
                        type="checkbox"
                        id="suvFormula1"
                        checked={categoryToggles["suvFormula1"] || false}
                        onChange={() => toggleSubcategory("Automobile & Motorcycle", "Formula 1", "suvFormula1")}
                      />
                      <label htmlFor="suvFormula1">Formula 1</label>
                    </li>
                    <li className="sub-sub-category">
                      <input
                        type="checkbox"
                        id="suvNascar"
                        checked={categoryToggles["suvNascar"] || false}
                        onChange={() => toggleSubcategory("Automobile & Motorcycle", "NASCAR", "suvNascar")}
                      />
                      <label htmlFor="suvNascar">NASCAR</label>
                    </li>
                  </>
                )}

                {/* Motor Bikes */}
                <li className="sub-category">
                  <button className="category-toggle" onClick={toggleMotorBikes}>
                    {showMotorBikes ? "-" : "+"}
                  </button>
                  <input
                    type="checkbox"
                    id="motorBike"
                    checked={categoryToggles["motorBike"] || false}
                    onChange={() => toggleSubcategory("Automobile & Motorcycle", "Motor Bike", "motorBike")}
                  />
                  <label htmlFor="motorBike">Motor Bike</label>
                </li>
                {showMotorBikes && (
                  <>
                    <li className="sub-sub-category">
                      <input
                        type="checkbox"
                        id="bikeFormula1"
                        checked={categoryToggles["bikeFormula1"] || false}
                        onChange={() => toggleSubcategory("Automobile & Motorcycle", "Formula 1", "bikeFormula1")}
                      />
                      <label htmlFor="bikeFormula1">Formula 1</label>
                    </li>
                    <li className="sub-sub-category">
                      <input
                        type="checkbox"
                        id="bikeNascar"
                        checked={categoryToggles["bikeNascar"] || false}
                        onChange={() => toggleSubcategory("Automobile & Motorcycle", "NASCAR", "bikeNascar")}
                      />
                      <label htmlFor="bikeNascar">NASCAR</label>
                    </li>
                  </>
                )}
              </>
            )}

            <li>
              <button className="category-toggle" onClick={() => setShowKidsToys(!showKidsToys)}>
                {showKidsToys ? "-" : "+"}
              </button>
              <input
                type="checkbox"
                id="kidsToys"
                checked={categoryToggles["kidsToys"] || false}
                onChange={() => toggleCategory("kidsToys", "Kids & Toys")}
              />
              <label htmlFor="kidsToys">Kids & Toys</label>
            </li>

            {showKidsToys && (
              <>
                {/* Baby Clothing */}
                <li className="sub-category">
                  <button className="category-toggle" onClick={() => setShowBabyClothing(!showBabyClothing)}>
                    {showBabyClothing ? "-" : "+"}
                  </button>
                  <input
                    type="checkbox"
                    id="babyClothing"
                    checked={categoryToggles["babyClothing"] || false}
                    onChange={() => toggleSubcategory("Kids & Toys", "Baby Clothing", "babyClothing")}
                  />
                  <label htmlFor="babyClothing">Baby Clothing</label>
                </li>
                {showBabyClothing && (
                  <li className="sub-sub-category">
                    <input
                      type="checkbox"
                      id="babyDress"
                      checked={categoryToggles["babyDress"] || false}
                      onChange={() => toggleSubcategory("Kids & Toys", "Baby Dress", "babyDress")}
                    />
                    <label htmlFor="babyDress">Baby Dress</label>
                  </li>
                )}

                {/* Boys Clothing */}
                <li className="sub-category">
                  <button className="category-toggle" onClick={() => setShowBoysClothing(!showBoysClothing)}>
                    {showBoysClothing ? "-" : "+"}
                  </button>
                  <input
                    type="checkbox"
                    id="boysClothing"
                    checked={categoryToggles["boysClothing"] || false}
                    onChange={() => toggleSubcategory("Kids & Toys", "Boys Clothing", "boysClothing")}
                  />
                  <label htmlFor="boysClothing">Boys Clothing</label>
                </li>

                {/* Girls Clothing */}
                <li className="sub-category">
                  <button className="category-toggle" onClick={() => setShowGirlsClothing(!showGirlsClothing)}>
                    {showGirlsClothing ? "-" : "+"}
                  </button>
                  <input
                    type="checkbox"
                    id="girlsClothing"
                    checked={categoryToggles["girlsClothing"] || false}
                    onChange={() => toggleSubcategory("Kids & Toys", "Girls Clothing", "girlsClothing")}
                  />
                  <label htmlFor="girlsClothing">Girls Clothing</label>
                </li>

                {/* Shoes & Bags */}
                <li className="sub-category">
                  <button className="category-toggle" onClick={() => setShowShoesBags(!showShoesBags)}>
                    {showShoesBags ? "-" : "+"}
                  </button>
                  <input
                    type="checkbox"
                    id="shoesBags"
                    checked={categoryToggles["shoesBags"] || false}
                    onChange={() => toggleSubcategory("Kids & Toys", "Shoes & Bags", "shoesBags")}
                  />
                  <label htmlFor="shoesBags">Shoes & Bags</label>
                </li>

                {/* Baby & Mother */}
                <li className="sub-category">
                  <button className="category-toggle" onClick={() => setShowBabyMother(!showBabyMother)}>
                    {showBabyMother ? "-" : "+"}
                  </button>
                  <input
                    type="checkbox"
                    id="babyMother"
                    checked={categoryToggles["babyMother"] || false}
                    onChange={() => toggleSubcategory("Kids & Toys", "Baby & Mother", "babyMother")}
                  />
                  <label htmlFor="babyMother">Baby & Mother</label>
                </li>

                {/* Miscellaneous Subcategories */}
                <li className="sub-category">
                  <input
                    type="checkbox"
                    id="kidsToy"
                    checked={categoryToggles["kidsToy"] || false}
                    onChange={() => toggleSubcategory("Kids & Toys", "Kids Toy", "kidsToy")}
                  />
                  <label htmlFor="kidsToy">Kids Toy</label>
                </li>
              </>
            )}

            <li>
              <button className="category-toggle" onClick={() => setShowSportsOutdoor(!showSportsOutdoor)}>
                {showSportsOutdoor ? "-" : "+"}
              </button>
              <input
                type="checkbox"
                id="sportsOutdoor"
                checked={categoryToggles["sportsOutdoor"] || false}
                onChange={() => toggleCategory("sportsOutdoor", "Sports & Outdoor")}
              />
              <label htmlFor="sportsOutdoor">Sports & Outdoor</label>
            </li>

            {showSportsOutdoor && (
              <>
                {/* Swimming */}
                <li className="sub-category">
                  <button className="category-toggle" onClick={() => setShowSwimming(!showSwimming)}>
                    {showSwimming ? "-" : "+"}
                  </button>
                  <input
                    type="checkbox"
                    id="swimming"
                    checked={categoryToggles["swimming"] || false}
                    onChange={() => toggleSubcategory("Sports & Outdoor", "Swimming", "swimming")}
                  />
                  <label htmlFor="swimming">Swimming</label>
                </li>

                {/* Cycling */}
                <li className="sub-category">
                  <button className="category-toggle" onClick={() => setShowCycling(!showCycling)}>
                    {showCycling ? "-" : "+"}
                  </button>
                  <input
                    type="checkbox"
                    id="cycling"
                    checked={categoryToggles["cycling"] || false}
                    onChange={() => toggleSubcategory("Sports & Outdoor", "Cycling", "cycling")}
                  />
                  <label htmlFor="cycling">Cycling</label>
                </li>

                {/* Sneakers */}
                <li className="sub-category">
                  <button className="category-toggle" onClick={() => setShowSneakers(!showSneakers)}>
                    {showSneakers ? "-" : "+"}
                  </button>
                  <input
                    type="checkbox"
                    id="sneakers"
                    checked={categoryToggles["sneakers"] || false}
                    onChange={() => toggleSubcategory("Sports & Outdoor", "Sneakers", "sneakers")}
                  />
                  <label htmlFor="sneakers">Sneakers</label>
                </li>

                {/* Fishing */}
                <li className="sub-category">
                  <button className="category-toggle" onClick={() => setShowFishing(!showFishing)}>
                    {showFishing ? "-" : "+"}
                  </button>
                  <input
                    type="checkbox"
                    id="fishing"
                    checked={categoryToggles["fishing"] || false}
                    onChange={() => toggleSubcategory("Sports & Outdoor", "Fishing", "fishing")}
                  />
                  <label htmlFor="fishing">Fishing</label>
                </li>
              </>
            )}


            {/* Jewelry & Watches */}
            {/* Jewelry & Watches */}
            <li>
              <button className="category-toggle" onClick={() => setShowJewelryWatches(!showJewelryWatches)}>
                {showJewelryWatches ? "-" : "+"}
              </button>
              <input
                type="checkbox"
                id="jewelryWatches"
                checked={categoryToggles["jewelryWatches"] || false}
                onChange={() => toggleCategory("jewelryWatches", "Jewelry & Watches")}
              />
              <label htmlFor="jewelryWatches">Jewelry & Watches</label>
            </li>

            {showJewelryWatches && (
              <>
                {/* Wedding & Engagement */}
                <li className="sub-category">
                  <button className="category-toggle" onClick={() => setShowWeddingEngagement(!showWeddingEngagement)}>
                    {showWeddingEngagement ? "-" : "+"}
                  </button>
                  <input
                    type="checkbox"
                    id="weddingEngagement"
                    checked={categoryToggles["weddingEngagement"] || false}
                    onChange={() => toggleSubcategory("Jewelry & Watches", "Wedding & Engagement", "weddingEngagement")}
                  />
                  <label htmlFor="weddingEngagement">Wedding & Engagement</label>
                </li>

                {/* Men's Watches */}
                <li className="sub-category">
                  <button className="category-toggle" onClick={() => setShowMensWatches(!showMensWatches)}>
                    {showMensWatches ? "-" : "+"}
                  </button>
                  <input
                    type="checkbox"
                    id="mensWatches"
                    checked={categoryToggles["mensWatches"] || false}
                    onChange={() => toggleSubcategory("Jewelry & Watches", "Men's Watches", "mensWatches")}
                  />
                  <label htmlFor="mensWatches">Men's Watches</label>
                </li>

                {/* Women's Watches */}
                <li className="sub-category">
                  <button className="category-toggle" onClick={() => setShowWomensWatches(!showWomensWatches)}>
                    {showWomensWatches ? "-" : "+"}
                  </button>
                  <input
                    type="checkbox"
                    id="womensWatches"
                    checked={categoryToggles["womensWatches"] || false}
                    onChange={() => toggleSubcategory("Jewelry & Watches", "Women's Watches", "womensWatches")}
                  />
                  <label htmlFor="womensWatches">Women's Watches</label>
                </li>

                {/* Fashion Jewelry */}
                <li className="sub-category">
                  <button className="category-toggle" onClick={() => setShowFashionJewelry(!showFashionJewelry)}>
                    {showFashionJewelry ? "-" : "+"}
                  </button>
                  <input
                    type="checkbox"
                    id="fashionJewelry"
                    checked={categoryToggles["fashionJewelry"] || false}
                    onChange={() => toggleSubcategory("Jewelry & Watches", "Fashion Jewelry", "fashionJewelry")}
                  />
                  <label htmlFor="fashionJewelry">Fashion Jewelry</label>
                </li>
              </>
            )}


            {/* Cellphones & Tabs */}
            <li>
              <button className="category-toggle" onClick={toggleCellphonesTabs}>
                {showCellphonesTabs ? "-" : "+"}
              </button>
              <input type="checkbox" id="cellphonesTabs" />
              <label htmlFor="cellphonesTabs">Cellphones & Tabs</label>
            </li>
            {showCellphonesTabs && (
              <>
                {/* Mobile Phones */}
                <li className="sub-category">
                  <button className="category-toggle" onClick={toggleMobilePhones}>
                    {showMobilePhones ? "-" : "+"}
                  </button>
                  <input type="checkbox" id="mobilePhones" />
                  <label htmlFor="mobilePhones">Mobile Phones</label>
                </li>

                {/* Mobile Phone Parts */}
                <li className="sub-category">
                  <button className="category-toggle" onClick={toggleMobilePhoneParts}>
                    {showMobilePhoneParts ? "-" : "+"}
                  </button>
                  <input type="checkbox" id="mobilePhoneParts" />
                  <label htmlFor="mobilePhoneParts">Mobile Phone Parts</label>
                </li>

                {/* Mobile Phone Accessories */}
                <li className="sub-category">
                  <button className="category-toggle" onClick={toggleMobilePhoneAccessories}>
                    {showMobilePhoneAccessories ? "-" : "+"}
                  </button>
                  <input type="checkbox" id="mobilePhoneAccessories" />
                  <label htmlFor="mobilePhoneAccessories">Mobile Phone Accessories</label>
                </li>

                {/* Tablets & Accessories */}
                <li className="sub-category">
                  <button className="category-toggle" onClick={toggleTabletsAccessories}>
                    {showTabletsAccessories ? "-" : "+"}
                  </button>
                  <input type="checkbox" id="tabletsAccessories" />
                  <label htmlFor="tabletsAccessories">Tablets & Accessories</label>
                </li>
              </>
            )}{/* Beauty, Health & Hair */}
            <li>
              <button className="category-toggle" onClick={() => setShowBeautyHealthHair(!showBeautyHealthHair)}>
                {showBeautyHealthHair ? "-" : "+"}
              </button>
              <input
                type="checkbox"
                id="beautyHealthHair"
                checked={categoryToggles["beautyHealthHair"] || false}
                onChange={() => toggleCategory("beautyHealthHair", "Beauty, Health & Hair")}
              />
              <label htmlFor="beautyHealthHair">Beauty, Health & Hair</label>
            </li>

            {showBeautyHealthHair && (
              <>
                {/* Makeup */}
                <li className="sub-category">
                  <button className="category-toggle" onClick={() => setShowMakeup(!showMakeup)}>
                    {showMakeup ? "-" : "+"}
                  </button>
                  <input
                    type="checkbox"
                    id="makeup"
                    checked={categoryToggles["makeup"] || false}
                    onChange={() => toggleSubcategory("Beauty, Health & Hair", "Makeup", "makeup")}
                  />
                  <label htmlFor="makeup">Makeup</label>
                </li>

                {/* Skin Care */}
                <li className="sub-category">
                  <button className="category-toggle" onClick={() => setShowSkinCare(!showSkinCare)}>
                    {showSkinCare ? "-" : "+"}
                  </button>
                  <input
                    type="checkbox"
                    id="skinCare"
                    checked={categoryToggles["skinCare"] || false}
                    onChange={() => toggleSubcategory("Beauty, Health & Hair", "Skin Care", "skinCare")}
                  />
                  <label htmlFor="skinCare">Skin Care</label>
                </li>

                {/* Nail Art & Tools */}
                <li className="sub-category">
                  <button className="category-toggle" onClick={() => setShowNailArtTools(!showNailArtTools)}>
                    {showNailArtTools ? "-" : "+"}
                  </button>
                  <input
                    type="checkbox"
                    id="nailArtTools"
                    checked={categoryToggles["nailArtTools"] || false}
                    onChange={() => toggleSubcategory("Beauty, Health & Hair", "Nail Art & Tools", "nailArtTools")}
                  />
                  <label htmlFor="nailArtTools">Nail Art & Tools</label>
                </li>
              </>
            )}


            {/* Home Improvement & Tools */}
            <li>
              <button className="category-toggle" onClick={() => setShowHomeImprovementTools(!showHomeImprovementTools)}>
                {showHomeImprovementTools ? "-" : "+"}
              </button>
              <input
                type="checkbox"
                id="homeImprovementTools"
                checked={categoryToggles["homeImprovementTools"] || false}
                onChange={() => toggleCategory("homeImprovementTools", "Home Improvement & Tools")}
              />
              <label htmlFor="homeImprovementTools">Home Improvement & Tools</label>
            </li>

            {showHomeImprovementTools && (
              <>
                {/* Indoor Lighting */}
                <li className="sub-category">
                  <button className="category-toggle" onClick={() => setShowIndoorLighting(!showIndoorLighting)}>
                    {showIndoorLighting ? "-" : "+"}
                  </button>
                  <input
                    type="checkbox"
                    id="indoorLighting"
                    checked={categoryToggles["indoorLighting"] || false}
                    onChange={() =>
                      toggleSubcategory("Home Improvement & Tools", "Indoor Lighting", "indoorLighting")
                    }
                  />
                  <label htmlFor="indoorLighting">Indoor Lighting</label>
                </li>

                {/* Outdoor Lighting */}
                <li className="sub-category">
                  <button className="category-toggle" onClick={() => setShowOutdoorLighting(!showOutdoorLighting)}>
                    {showOutdoorLighting ? "-" : "+"}
                  </button>
                  <input
                    type="checkbox"
                    id="outdoorLighting"
                    checked={categoryToggles["outdoorLighting"] || false}
                    onChange={() =>
                      toggleSubcategory("Home Improvement & Tools", "Outdoor Lighting", "outdoorLighting")
                    }
                  />
                  <label htmlFor="outdoorLighting">Outdoor Lighting</label>
                </li>

                {/* LED Lighting */}
                <li className="sub-category">
                  <button className="category-toggle" onClick={() => setShowLEDLighting(!showLEDLighting)}>
                    {showLEDLighting ? "-" : "+"}
                  </button>
                  <input
                    type="checkbox"
                    id="ledLighting"
                    checked={categoryToggles["ledLighting"] || false}
                    onChange={() =>
                      toggleSubcategory("Home Improvement & Tools", "LED Lighting", "ledLighting")
                    }
                  />
                  <label htmlFor="ledLighting">LED Lighting</label>
                </li>

                {/* Tools (no toggle button needed) */}
                <li className="sub-category">
                  <input
                    type="checkbox"
                    id="tools"
                    checked={categoryToggles["tools"] || false}
                    onChange={() =>
                      toggleSubcategory("Home Improvement & Tools", "Tools", "tools")
                    }
                  />
                  <label htmlFor="tools">Tools</label>
                </li>
              </>
            )}


            {/* Home decoration & Appliance */}
            <li>
              <button className="category-toggle" onClick={() => setShowHomeDecorationAppliance(!showHomeDecorationAppliance)}>
                {showHomeDecorationAppliance ? "-" : "+"}
              </button>
              <input
                type="checkbox"
                id="homeDecorationAppliance"
                checked={categoryToggles["homeDecorationAppliance"] || false}
                onChange={() => toggleCategory("homeDecorationAppliance", "Home Decoration & Appliance")}
              />
              <label htmlFor="homeDecorationAppliance">Home Decoration & Appliance</label>
            </li>

            {showHomeDecorationAppliance && (
              <>
                {/* Home Decor */}
                <li className="sub-category">
                  <button className="category-toggle" onClick={() => setShowHomeDecor(!showHomeDecor)}>
                    {showHomeDecor ? "-" : "+"}
                  </button>
                  <input
                    type="checkbox"
                    id="homeDecor"
                    checked={categoryToggles["homeDecor"] || false}
                    onChange={() => toggleSubcategory("Home Decoration & Appliance", "Home Decor", "homeDecor")}
                  />
                  <label htmlFor="homeDecor">Home Decor</label>
                </li>

                {/* Home Textile */}
                <li className="sub-category">
                  <button className="category-toggle" onClick={() => setShowHomeTextile(!showHomeTextile)}>
                    {showHomeTextile ? "-" : "+"}
                  </button>
                  <input
                    type="checkbox"
                    id="homeTextile"
                    checked={categoryToggles["homeTextile"] || false}
                    onChange={() => toggleSubcategory("Home Decoration & Appliance", "Home Textile", "homeTextile")}
                  />
                  <label htmlFor="homeTextile">Home Textile</label>
                </li>

                {/* Furniture */}
                <li className="sub-category">
                  <button className="category-toggle" onClick={() => setShowFurniture(!showFurniture)}>
                    {showFurniture ? "-" : "+"}
                  </button>
                  <input
                    type="checkbox"
                    id="furniture"
                    checked={categoryToggles["furniture"] || false}
                    onChange={() => toggleSubcategory("Home Decoration & Appliance", "Furniture", "furniture")}
                  />
                  <label htmlFor="furniture">Furniture</label>
                </li>
              </>
            )}

            <li>
              <button className="category-toggle" onClick={() => setShowToy(!showToy)}>
                {showToy ? "-" : "+"}
              </button>
              <input type="checkbox" id="toy" checked={categoryToggles["toy"] || false}
                onChange={() => toggleCategory("toy", "Toy")} />
              <label htmlFor="toy">Toy</label>
            </li>
            {showToy && (
              <>
                {/* Baby Toy */}
                <li className="sub-category">
                  <input type="checkbox" id="babyToy" checked={categoryToggles["babyToy"] || false}
                    onChange={() => toggleSubcategory("Toy", "Baby Toy", "babyToy")} />
                  <label htmlFor="babyToy">Baby Toy</label>
                </li>
              </>
            )}
          </ul>
        </div>
      </div >
    </div >

  );
};

export default ProductCategory;