import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonPage, IonRange, IonRow, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import { Chart  } from "react-google-charts";
import { useEffect, useRef, useState } from 'react';
// import Dataset from "../data/dataset";
import Dataset from '../data/data.json';
import { playCircle, stopCircle } from 'ionicons/icons';
import { calculations } from '../util/Calculations'
import DecreasingChart from '../components/DecreasingChart';
import IncreasingChart from '../components/IncreasingChart';
import StraightChart from '../components/StraightChart';

const Tab2: React.FC = () => {

  const elementHeightRef = useRef(null);
  const elementWidthRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const [currentStep, setCurrentStep] = useState(0); 
  
  const [isMobile] = useState(window.innerWidth <= 768); 

  const [year, setYear] = useState(2022);

  const [selectedCountry, setSelectedCountry] = useState("Austria");

  const [retirementAge, setRetirementAge] = useState(65);
  const [payout, setPayout] = useState(25000);
  const [immigrationRate, setimmigrationRate] = useState(1);
  const [birthRate, setBirthRate] = useState(1);
  const [deathRate, setDeathRate] = useState(1);
  

  const [isAnimating, setIsAnimating] = useState(false);

  const [actualData, setActualData] = useState(Dataset[2022]);

  const [dataset, setDataset] = useState({...Dataset});

  const [options, setOptions] = useState({
    // title: "Austrian pyramid",
    height: dimensions.height,
    width: dimensions.width,
    isStacked: true,
    hAxis: { 
      format: ";",
      direction: -1,
      textStyle: { color: '#EFEFEF' },
      gridlines: { color: '#444' }
    },
    vAxis: { 
      direction: -1,
      textStyle: { color: '#EFEFEF' },
      gridlines: { color: '#444' }
    },
    chartArea: {
      bottom: '5%',
      top: '5%',
      left: '10%',
      right: '10%',
    },
    legend: { textStyle: { color: '#EFEFEF' } },
    colors: ['#5C9BA0', '#BE6B7D'],
    fontSize: 12,
    fontName: 'Arial',
    focusTarget: "category",
    allowHtml: true,
    backgroundColor: 'transparent',
    titleTextStyle: {
      color: '#EFEFEF', 
    },
  });

  const titles = ["Welcome", "Retirement age", "Pension payout", "Immigration rate", "Birth rate", "Death rate"]
  const subtitles = ["Introduction", "Pension system", "Pension system", "Population", "Population", "Population"]
  const descriptions = [
    "This interactive tool allows you to explore how various factors like retirement age, pension payouts, and immigration rates impact a country's population dynamics. Adjust settings to see how birth and death rates shape the demographic structure over time. Dive in and discover the intricate balance of a nation's population growth and sustainability! Begin your journey by selecting a country of interest, and embark on an insightful exploration of its population dynamics and demographic changes.",
    "Defines the age at which individuals are expected to retire. A higher retirement age can extend the working life, reducing the ratio of pensioners to active workers. Adjusting this age impacts the pension system's sustainability and the labor market.",
    "Represents the amount of money retirees receive regularly. Increasing pension payouts can lead to higher financial obligations for the working population. Conversely, lower payouts may affect the quality of life for pensioners.",
    "Measures the rate of incoming individuals from other countries. High immigration rates can supplement the workforce and contribute to economic growth. Low immigration rates may lead to a decrease in the labor force and demographic challenges.",
    "Reflects the average number of children born per woman. A higher birth rate can result in a younger population, influencing long-term economic and social dynamics. A lower birth rate might lead to an aging population and increased dependency ratios.", 
    "Indicates the frequency of deaths within a population. A lower death rate typically correlates with higher life expectancy, affecting the population's age structure. Changes in the death rate can significantly impact population growth and demographic trends."
  ]

  useEffect(() => {
    if (selectedCountry) {
      const pyramid = JSON.parse(JSON.stringify(Dataset[2022]));
      const data = {
        "country": selectedCountry,
        pyramid,
        retirementAge,
        payout,
        immigrationRate,
        birthRate,
        deathRate
      }
      const newPyramid = calculations(data)
      // console.log(newPyramid)
      setYear(2022)
      updatePyramidData(newPyramid)
    }

  }, [retirementAge, payout, immigrationRate, birthRate, deathRate]);

  const updateDimensions = () => {
    if (elementHeightRef.current && elementWidthRef.current) {
      const { offsetHeight } = elementHeightRef.current;
      const { offsetWidth } = elementWidthRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight  * 0.85 });
      options.height = offsetHeight * 0.85 
      options.width = offsetWidth
      setOptions(options)
    }

  };

  const updatePyramidData = (newPyramid) => {
    const updatedDataset = { ...dataset };


    for (const year in newPyramid) {
      updatedDataset[year] = newPyramid[year];
    }

    // console.log("updatedDataset", updatedDataset)
    setDataset(updatedDataset);
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
  }, [elementHeightRef.current, elementWidthRef.current]);

  // Change the year by the slider 
  const changeRangeYear = (e: { detail: { value: any; }; }) => {
    const newValue = e.detail.value;
    setYear(newValue);
  };

  const handleRetiremnetChange = (e: CustomEvent) => {
    setRetirementAge(e.detail.value);
  };

  const handlePayoutChange = (e: CustomEvent) => {
    setPayout(e.detail.value);
  };

  const handleimmigrationChange = (e: CustomEvent) => {
    setimmigrationRate(e.detail.value);
  };

  const handleBirthRateChange = (e: CustomEvent) => {
    setBirthRate(e.detail.value);
  };

  const handleDeathRateChange = (e: CustomEvent) => {
    setDeathRate(e.detail.value);
  };


  
   
  // animation 
  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (isAnimating) {
      interval = setInterval(() => {
        setYear(prevYear => {
          if (prevYear >= 2100) {
            clearInterval(interval); // Stop the interval when year reaches the end year
            stopAnimation()
            return prevYear; 
          }
          return prevYear + 1;
        });
      }, 500); 
    }

    return () => clearInterval(interval); // Clear interval on component unmount or stop
  }, [isAnimating]);

  const changeDataset = (year: number) => {
    setActualData(dataset[year])
  }

  useEffect(() => {
    if (year) {
      changeDataset(year)
    }
  }, [year]);

  const startAnimation = () => {
    setIsAnimating(true);
  };

  const stopAnimation = () => {
    setIsAnimating(false);
  };

  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent ref={elementHeightRef} fullscreen >
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          <IonRow>
            {/* chart pc */}
            {!isMobile  && 
            <IonCol sizeXs="12" size-md="8" ref={elementWidthRef}>
              <IonRow>
                <Chart
                    chartType="BarChart"
                    data={actualData}
                    options={options}
                    width={dimensions.width}
                    height={dimensions.height}
                    legendToggle
                  />
              </IonRow>
              <IonRow>
                <IonCol className="center-text" size-sm="12" size-md="2">
                  {isAnimating ?
                  <IonIcon className='ranger-padding-icon' color="primary" onClick={stopAnimation} icon={stopCircle} size="large"></IonIcon>:
                  <IonIcon className='ranger-padding-icon' color="primary" onClick={startAnimation} icon={playCircle} size="large"></IonIcon>}
                </IonCol>
                <IonCol size-sm="12" size-md="8">
                    <IonRange
                      min={1950}
                      max={2100}
                      step={1}
                      value={year}
                      onIonChange={changeRangeYear}
                      pin={true}
                      snaps={true}
                      disabled={isAnimating}
                    />
                </IonCol>
                <IonCol size-sm="12" size-md="2">
                  <div className="center-text ranger-padding">{year}</div>
                </IonCol>
              </IonRow>
            </IonCol>}

            {/* Chart mobile */}
            {(isMobile && currentStep === 6) && 
            <IonCol sizeXs="12" size-md="8" ref={elementWidthRef}>
              <IonRow>
                <IonCol className="center-text" size-sm="12" size-md="2">
                  {isAnimating ?
                  <IonIcon className='ranger-padding-mobil-icon' color="primary" onClick={stopAnimation} icon={stopCircle} size="large"></IonIcon>:
                  <IonIcon className='ranger-padding-mobil-icon' color="primary" onClick={startAnimation} icon={playCircle} size="large"></IonIcon>}
                </IonCol>
                <IonCol size-sm="12" size-md="8">
                    <IonRange
                    className='mobil-range'
                      min={1950}
                      max={2100}
                      step={1}
                      value={year}
                      onIonChange={changeRangeYear}
                      pin={true}
                      snaps={true}
                      disabled={isAnimating}
                    />
                </IonCol>
                <IonCol size-sm="12" size-md="2">
                  <div className="center-text ranger-padding-mobil">{year}</div>
                </IonCol>
              </IonRow>
              <IonRow>
                <Chart
                    chartType="BarChart"
                    data={actualData}
                    options={options}
                    width={dimensions.width}
                    height={dimensions.height}
                    legendToggle
                  />
              </IonRow>
            </IonCol>}

            {/* Input section */}
            <IonCol size-sm="12" size-md="4">
              {!isMobile  && <IonTitle className="title-inputs">Inputs: </IonTitle>}

              {/* welcome mobil */}
              {(isMobile && currentStep === 0) &&
              <IonRow>
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>{titles[currentStep]}</IonCardTitle>
                    <IonCardSubtitle>{subtitles[currentStep]}</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>{descriptions[currentStep]}</IonCardContent>

                  <IonText className="title-mobil">Select a country</IonText>
                  
                  <IonSelect className="custom-select" value={selectedCountry} placeholder="Select One" onIonChange={e => setSelectedCountry(e.detail.value)}>
                    <IonSelectOption value="Austria">Austria</IonSelectOption>
                    <IonSelectOption value="Germany">Germany</IonSelectOption>
                    <IonSelectOption value="canada">Sweden</IonSelectOption>
                    <IonSelectOption value="canada">China</IonSelectOption>
                    <IonSelectOption value="United States of America">USA</IonSelectOption>
                    {/* Add more options as needed */}
                  </IonSelect>
                  <IonRow>
                    <IonCol size-xs="1"></IonCol>
                    <IonCol size-xs="5">
                      <button disabled={currentStep < 1} className="button direction-button" onClick={() =>{setCurrentStep(currentStep - 1)}}>Back</button>
                    </IonCol>
                    <IonCol size-xs="5">
                      <button disabled={currentStep > 6} className="button direction-button" onClick={() =>{setCurrentStep(currentStep + 1)}} >Next</button>
                    </IonCol>
                    <IonCol size-xs="1"></IonCol>
                  </IonRow>
                </IonCard>
              </IonRow>
              }

              {/* Retirement age desktop */}
              {!isMobile  && <IonRow>
                <IonCol>
                  <IonTitle className="title-style">Retirement age</IonTitle>
                  <IonRange
                    className='slider'
                    min={50}
                    max={80}
                    step={1}
                    pinFormatter={(value: number) => `${value}`}
                    value={retirementAge}
                    onIonChange={handleRetiremnetChange}
                    pin={true}
                    snaps={true}
                    disabled={isAnimating}
                  />
                </IonCol>
              </IonRow>}
              {/* Retirement age mobil */}
              {(isMobile && currentStep === 1) &&
              <IonRow>
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>{titles[currentStep]}</IonCardTitle>
                    <IonCardSubtitle>{subtitles[currentStep]}</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>{descriptions[currentStep]}</IonCardContent>

                  {retirementAge === 65 ? <StraightChart />: 
                  retirementAge < 65 ?
                  <DecreasingChart decreasePercentage={0.1}/>:
                  <IncreasingChart decreasePercentage={0.1}/>}

                  <IonText className="title-style">{titles[currentStep]} input</IonText>
                  <IonRange
                    className='mobil-slider'
                    min={50}
                    max={80}
                    step={1}
                    pinFormatter={(value: number) => `${value}`}
                    value={retirementAge}
                    onIonChange={handleRetiremnetChange}
                    pin={true}
                    snaps={true}
                    disabled={isAnimating}
                  />
                  <IonRow>
                    <IonCol size-xs="1"></IonCol>
                    <IonCol size-xs="5">
                      <button disabled={currentStep < 1} className="button direction-button" onClick={() =>{setCurrentStep(currentStep - 1)}}>Back</button>
                    </IonCol>
                    <IonCol size-xs="5">
                      <button disabled={currentStep > 6} className="button direction-button" onClick={() =>{setCurrentStep(currentStep + 1)}} >Next</button>
                    </IonCol>
                    <IonCol size-xs="1"></IonCol>
                  </IonRow>
                </IonCard>
              </IonRow>
              }

              {/* Payout for pensioners pc */}
              {!isMobile && <IonRow>
                <IonCol>
                  <IonTitle className="title-style">Payout for pensioners</IonTitle>
                  <IonRange
                    className='slider'
                    min={10000}
                    max={40000}
                    step={1000}
                    pinFormatter={(value: number) => `${value}`}
                    value={payout}
                    onIonChange={handlePayoutChange}
                    pin={true}
                    snaps={true}
                    disabled={isAnimating}
                  />
                </IonCol>
              </IonRow>}

              {/* Payout for pensioners mobil */}
              {(isMobile && currentStep === 2) &&
              <IonRow>
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>{titles[currentStep]}</IonCardTitle>
                    <IonCardSubtitle>{subtitles[currentStep]}</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>{descriptions[currentStep]}</IonCardContent>

                  {payout === 25000 ? <StraightChart />: 
                  payout < 25000 ?
                  <DecreasingChart decreasePercentage={0.1}/>:
                  <IncreasingChart decreasePercentage={0.1}/>}

                  <IonText className="title-style">{titles[currentStep]} input</IonText>
                  <IonRange
                    className='mobil-slider'
                    min={10000}
                    max={40000}
                    step={1000}
                    pinFormatter={(value: number) => `${value}`}
                    value={payout}
                    onIonChange={handlePayoutChange}
                    pin={true}
                    snaps={true}
                    disabled={isAnimating}
                  />
                  <IonRow>
                    <IonCol size-xs="1"></IonCol>
                    <IonCol size-xs="5">
                      <button disabled={currentStep < 1} className="button direction-button" onClick={() =>{setCurrentStep(currentStep - 1)}}>Back</button>
                    </IonCol>
                    <IonCol size-xs="5">
                      <button disabled={currentStep > 6} className="button direction-button" onClick={() =>{setCurrentStep(currentStep + 1)}} >Next</button>
                    </IonCol>
                    <IonCol size-xs="1"></IonCol>
                  </IonRow>
                </IonCard>
              </IonRow>
              }

              {/* Immigration rate pc */}
              {!isMobile && <IonRow>
                <IonCol>
                  <IonTitle className="title-style">Immigration rate</IonTitle>
                  <IonRange
                    className='slider'
                    min={0}
                    max={2}
                    step={0.1}
                    pinFormatter={(value: number) => `${value}`}
                    value={immigrationRate}
                    onIonChange={handleimmigrationChange}
                    pin={true}
                    snaps={true}
                    disabled={isAnimating}
                  />
                </IonCol>
              </IonRow>}

              {/* Immigration rate mobil */}
              {(isMobile && currentStep === 3) &&
                <IonRow>
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>{titles[currentStep]}</IonCardTitle>
                      <IonCardSubtitle>{subtitles[currentStep]}</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>{descriptions[currentStep]}</IonCardContent>

                    {immigrationRate === 1 ? <StraightChart />: 
                    immigrationRate < 1 ?
                    <DecreasingChart decreasePercentage={0.1}/>:
                    <IncreasingChart decreasePercentage={0.1}/>}

                    <IonText className="title-style">{titles[currentStep]} input</IonText>
                    <IonRange
                      className='slider'
                      min={0}
                      max={2}
                      step={0.1}
                      pinFormatter={(value: number) => `${value}`}
                      value={immigrationRate}
                      onIonChange={handleimmigrationChange}
                      pin={true}
                      snaps={true}
                      disabled={isAnimating}
                    />
                    <IonRow>
                      <IonCol size-xs="1"></IonCol>
                      <IonCol size-xs="5">
                        <button disabled={currentStep < 1} className="button direction-button" onClick={() =>{setCurrentStep(currentStep - 1)}}>Back</button>
                      </IonCol>
                      <IonCol size-xs="5">
                        <button disabled={currentStep > 6} className="button direction-button" onClick={() =>{setCurrentStep(currentStep + 1)}} >Next</button>
                      </IonCol>
                      <IonCol size-xs="1"></IonCol>
                    </IonRow>
                  </IonCard>
                </IonRow>
              }

              {/* Birth rate pc */}
              {!isMobile && <IonRow>
                <IonCol>
                  <IonTitle className="title-style">Birth rate</IonTitle>
                  <IonRange
                    className='slider'
                    min={0.5}
                    max={1.5}
                    step={0.1}
                    pinFormatter={(value: number) => `${value}`}
                    value={birthRate}
                    onIonChange={handleBirthRateChange}
                    pin={true}
                    snaps={true}
                    disabled={isAnimating}
                  />
                </IonCol>
              </IonRow>}

              {/* Birth rate mobil */}
              {(isMobile && currentStep === 4) &&
                <IonRow>
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>{titles[currentStep]}</IonCardTitle>
                      <IonCardSubtitle>{subtitles[currentStep]}</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>{descriptions[currentStep]}</IonCardContent>

                    {birthRate === 1 ? <StraightChart />: 
                    birthRate < 1 ?
                    <DecreasingChart decreasePercentage={0.1}/>:
                    <IncreasingChart decreasePercentage={0.1}/>}

                    <IonText className="title-style">{titles[currentStep]} input</IonText>
                    <IonRange
                      className='slider'
                      min={0.5}
                      max={1.5}
                      step={0.1}
                      pinFormatter={(value: number) => `${value}`}
                      value={birthRate}
                      onIonChange={handleBirthRateChange}
                      pin={true}
                      snaps={true}
                      disabled={isAnimating}
                    />
                    <IonRow>
                      <IonCol size-xs="1"></IonCol>
                      <IonCol size-xs="5">
                        <button disabled={currentStep < 1} className="button direction-button" onClick={() =>{setCurrentStep(currentStep - 1)}}>Back</button>
                      </IonCol>
                      <IonCol size-xs="5">
                        <button disabled={currentStep > 6} className="button direction-button" onClick={() =>{setCurrentStep(currentStep + 1)}} >Next</button>
                      </IonCol>
                      <IonCol size-xs="1"></IonCol>
                    </IonRow>
                  </IonCard>
                </IonRow>
              }

              {/* Death rate pc */}
              {!isMobile && <IonRow>
                <IonCol>
                <IonTitle className="title-style">Death rate</IonTitle>
                  <IonRange
                    className='slider'
                    min={0}
                    max={5}
                    step={0.5}
                    pinFormatter={(value: number) => `${value}`}
                    value={deathRate}
                    onIonChange={handleDeathRateChange}
                    pin={true}
                    snaps={true}
                    disabled={isAnimating}
                  />
                </IonCol>
              </IonRow>}

              {/* Death rate mobil */}
              {(isMobile && currentStep === 5) &&
                <IonRow>
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>{titles[currentStep]}</IonCardTitle>
                      <IonCardSubtitle>{subtitles[currentStep]}</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>{descriptions[currentStep]}</IonCardContent>

                    {deathRate === 1 ? <StraightChart />: 
                    deathRate < 1 ?
                    <DecreasingChart decreasePercentage={0.1}/>:
                    <IncreasingChart decreasePercentage={0.1}/>}

                    <IonText className="title-style">{titles[currentStep]} input</IonText>
                    <IonRange
                      className='slider'
                      min={0}
                      max={5}
                      step={0.5}
                      pinFormatter={(value: number) => `${value}`}
                      value={deathRate}
                      onIonChange={handleDeathRateChange}
                      pin={true}
                      snaps={true}
                      disabled={isAnimating}
                    />
                    <IonRow>
                      <IonCol size-xs="1"></IonCol>
                      <IonCol size-xs="5">
                        <button disabled={currentStep < 1} className="button direction-button" onClick={() =>{setCurrentStep(currentStep - 1)}}>Back</button>
                      </IonCol>
                      <IonCol size-xs="5">
                        <button disabled={currentStep > 6} className="button direction-button" onClick={() =>{setCurrentStep(currentStep + 1)}} >Next</button>
                      </IonCol>
                      <IonCol size-xs="1"></IonCol>
                    </IonRow>
                  </IonCard>
                </IonRow>
              }
            </IonCol>
          </IonRow>
      </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
