import { IonAlert, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonPage, IonRange, IonRow, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import { Chart  } from "react-google-charts";
import { useEffect, useRef, useState } from 'react';
// import Dataset from "../data/dataset";
// import Dataset from '../data/data.json';
import popPyramids from '../data/popPyramids.json';
import { playCircle, stopCircle, } from 'ionicons/icons';
import { calculations } from '../util/Calculations'
import BarChartComponent from '../components/BarChartComponent';

const Tab2: React.FC = () => {

  const elementHeightRef = useRef(null);
  const elementWidthRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const [currentStep, setCurrentStep] = useState(0); 
  
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); 

  const [year, setYear] = useState(2022);

  const [selectedCountry, setSelectedCountry] = useState("Austria");

  const [retirementAge, setRetirementAge] = useState(65);
  const [payout, setPayout] = useState(25000);
  const [immigrationRate, setimmigrationRate] = useState(1);
  const [birthRate, setBirthRate] = useState(1);
  const [deathRate, setDeathRate] = useState(1);
  

  const [isAnimating, setIsAnimating] = useState(false);

  const [actualData, setActualData] = useState(popPyramids["Sweden"][2021]);

  const [dataset, setDataset] = useState({...popPyramids[selectedCountry]});

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
      right: isMobile ? '20%' : '10%',
    },
    legend: { textStyle: { color: '#EFEFEF' }, position: 'bottom'},
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
    "The slider starts at the current retirement age of the country. At what age do you think it is appropriate that the average citizen should retire? Remember: Moving the slider changes the ratio of Worker:Pensioner. What do you think is realistic? What do you think is humane and worthy? (Dani: This text you can cut from the back, if you need the space)",
    "How much do you think the average retiree should get paid out each year? Remember: The money has to be paid by the working population. What do you think is realistic? What do you think is humane and worthy?",
    "The slider starts at the current (=1) predicted immigration in the country. How much more/less immigration than the current predictions will you allow? (0.5 = half as much as planned, 1.5 = 50% more than planned) Remember: This will influence working population.",
    "The slider starts at the current (=1) predicted birth rate in the country. How much more/less children than the current predictions do you think will be born? (0.5 = half as much as planned, 1.5 = 50% more than planned) Remember: This will influence working population down the line.", 
    "The slider starts at the current (=1) predicted deaths in the country. Do you think people will tend to die before the UN prognosis, or later? How might this influence the demographic pyramid?"
  ]
  
  const [selectedChallenge, setSelectedChallenge] = useState("easy");
  const [challengeLimit, setChallengeLimit] = useState({Austria: 15000, Germany: 15000, Sweden: 13000, China: 20000, USA: 13000});
  const challenges = {
    easy: {descriptions: "Can you imagine circumstances where the employed population will pay less than " + challengeLimit[selectedCountry]},
    medium: {descriptions: "Can you imagine circumstances where the employed population will pay less than " + challengeLimit[selectedCountry] + " per year to fund the retired population, without changing the retirement payout"},
    hard: {descriptions: "Can you imagine circumstances where the employed population will pay less than " + challengeLimit[selectedCountry] + " per year to fund the retired population, without changing the retirement payout or retirement age?"}
  }
  const [finalResult, setFinalResult] = useState({header: "", result: "", message: ""})
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth) {
      setIsMobile(window.innerWidth <= 768)
    }
  }, [window.innerWidth]);

  useEffect(() => {
    if (selectedCountry) {
      setDataset({...popPyramids[selectedCountry]})
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry) {
      const pyramid = JSON.parse(JSON.stringify(popPyramids[selectedCountry][2022]));
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

  }, [retirementAge, payout, immigrationRate, birthRate, deathRate, selectedCountry]);

  const updateDimensions = () => {
    if (elementHeightRef.current && elementWidthRef.current) {
      const { offsetHeight } = elementHeightRef.current;
      const { offsetWidth } = elementWidthRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight  * 0.85 });
      if (isMobile) {
        setDimensions({ width: offsetWidth, height: offsetHeight  * 0.80 });
        options.height = offsetHeight * 0.80
        options.width = offsetWidth
      }
      else{
        setDimensions({ width: offsetWidth, height: offsetHeight  * 0.85 });
        options.height = offsetHeight * 0.85 
        options.width = offsetWidth
      }
      setOptions(options)
    }

  };

  const updatePyramidData = (newPyramid) => {
    const updatedDataset = { ...dataset };


    for (const year in newPyramid) {
      updatedDataset[year] = newPyramid[year];
    }

    console.log("updatedDataset", updatedDataset)
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

  const totalPensionAmount = () => {
    const pensioners = pensionersCount()
    return pensioners * payout
  }
  
  const pensionersCount = () => {
    let totalPensioners = 0;
    for (let i = retirementAge; i < 101; i++) {
      // @ts-ignore
      totalPensioners = totalPensioners + dataset[year][i][1] - dataset[year][i][2]
    }
    return totalPensioners
  }

  const totalPopulationCount = () => {
    let totalPopulation = 0;
    for (let i = 1; i < 101; i++) {
      // @ts-ignore
      totalPopulation = totalPopulation + dataset[year][i][1] - dataset[year][i][2]
    }
    return totalPopulation
  }

  const workersCount = () => {
    let totalworkers = 0;
    for (let i = 20; i < retirementAge; i++) {
      // @ts-ignore
      totalworkers = totalworkers + dataset[year][i][1] - dataset[year][i][2]
    }
    return totalworkers
  }

  useEffect(() => {
    if (actualData) {
      const pensionAmount = totalPensionAmount()
      const workers = workersCount()
      //console.log(pensionAmount / workers)
    }

  }, [actualData]);
  
   
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

  const calculateResult = () => {
    const pensionAmount = totalPensionAmount()
    const workers = workersCount()
    const pensioners = pensionersCount()
    if (challengeLimit[selectedCountry] > pensionAmount / workers) {
      setFinalResult({
        header: "Congratulations!", 
        result: "Number of workers: " + workers + "<br>Number of pensioners: " + pensioners, 
        message: "You are a successful ruler of " + selectedCountry + ". Every employed person pays " + Math.round(pensionAmount / workers) + " € to keep the system going. " + (challengeLimit[selectedCountry] - Math.round(pensionAmount / workers)) + " € less than planned."})
    }
    else{
      setFinalResult({
        header: "Oh no!",
        result: "\nNumber of workers: " + workers + " <br>Number of pensioners: " + pensioners,
        message: "You are not a successful ruler of  " + selectedCountry + " :( Because of your choices, every working person must pay " + Math.round(pensionAmount / workers) + " € every year. " + ( Math.round(pensionAmount / workers) - challengeLimit[selectedCountry] ) + " € more than planned."})
    }
  }

  useEffect(() => {
    if (year) {
      changeDataset(year)
      if (year === 2100) {
        setIsOpen(true);
        calculateResult()
      }
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
      {!isMobile  &&<IonHeader>
        <IonToolbar>
          <IonTitle>{selectedCountry + " - " + selectedChallenge}</IonTitle>
        </IonToolbar>
      </IonHeader>}
      <IonContent ref={elementHeightRef} fullscreen >
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large" className='top-large-margin'>{selectedCountry + " - " + selectedChallenge}</IonTitle>
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
                <IonCol size-sm="6">
                    <span>Population: {Math.round(totalPopulationCount())}</span>
                </IonCol>

                <IonCol size-sm="6">
                    <span>Pension amout: {Math.round(totalPensionAmount() / workersCount())}</span>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size-sm="12">
                  <Chart
                    chartType="BarChart"
                    data={actualData}
                    options={options}
                    width={dimensions.width}
                    height={dimensions.height}
                    legendToggle
                    />
                </IonCol>
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
                    <IonSelectOption value="Sweden">Sweden</IonSelectOption>
                    <IonSelectOption value="China">China</IonSelectOption>
                    <IonSelectOption value="USA">USA</IonSelectOption>
                  </IonSelect>

                  <IonText className="title-mobil">Select a challenge</IonText>
                  
                  <IonSelect className="custom-select" value={selectedChallenge} placeholder="Difficulty level" onIonChange={e => setSelectedChallenge(e.detail.value)}>
                    <IonSelectOption value="easy">Easy</IonSelectOption>
                    <IonSelectOption value="medium">Medium</IonSelectOption>
                    <IonSelectOption value="hard">Hard</IonSelectOption>
                  </IonSelect>
                  <IonCardContent className='no-padding-top'>{challenges[selectedChallenge].descriptions}</IonCardContent>
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

                  <IonCardContent className='no-padding-bottom'>{descriptions[currentStep]}</IonCardContent>

                  <BarChartComponent originalValue={65} actualValue={retirementAge} />

                  <IonText className="title-style">{titles[currentStep] + " " + selectedCountry + ": " + retirementAge}</IonText>
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
                    disabled={isAnimating || selectedChallenge === "hard"}
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
                  
                  <IonCardContent className='no-padding-bottom'>{descriptions[currentStep]}</IonCardContent>

                  <BarChartComponent originalValue={25000} actualValue={payout} />

                  <IonText className="title-style">{titles[currentStep] + " " + selectedCountry + ": "} <b>{payout}</b></IonText>
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
                    disabled={isAnimating || selectedChallenge === "medium" || selectedChallenge === "hard"}
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
                     
                    <IonCardContent className='no-padding-bottom'>{descriptions[currentStep]}</IonCardContent>

                    <BarChartComponent originalValue={1} actualValue={immigrationRate} />

                    <IonText className="title-style">{titles[currentStep] + " " + selectedCountry + ": "} <b>{immigrationRate}</b></IonText>
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

                    <IonCardContent className='no-padding-bottom'>{descriptions[currentStep]}</IonCardContent>

                    <BarChartComponent originalValue={1} actualValue={birthRate} />

                    <IonText className="title-style">{titles[currentStep] + " " +  selectedCountry + ": "} <b>{birthRate}</b></IonText>
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

                    <IonCardContent className='no-padding-bottom'>{descriptions[currentStep]}</IonCardContent>

                    <BarChartComponent originalValue={1} actualValue={deathRate} />

                    <IonText className="title-style">{titles[currentStep] + " " + selectedCountry + ": "} <b>{deathRate}</b></IonText>
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
      {isMobile && <IonAlert
        isOpen={isOpen}
        header={finalResult.header}
        message={finalResult.message}
        buttons={['Close']}
        onDidDismiss={() => setIsOpen(false)}
      ></IonAlert>}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
