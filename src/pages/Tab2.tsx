import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonPage, IonRange, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import { Chart  } from "react-google-charts";
import { useEffect, useRef, useState } from 'react';
import Dataset from "../data/dataset";
import { playCircle, stopCircle } from 'ionicons/icons';

const Tab2: React.FC = () => {

  const elementHeightRef = useRef(null);
  const elementWidthRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const [year, setYear] = useState(1950);

  const [payout, setPayout] = useState(1500);
  const [imigrants, setImigrants] = useState(10000);
  const [birthRate, setBirthRate] = useState(500);
  
  

  const [isAnimating, setIsAnimating] = useState(false);

  const [dataset, setDataset] = useState(Dataset[1950]);

  const [options, setOptions] = useState({
    title: "Austrian pyramid",
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

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
  }, [elementHeightRef.current, elementWidthRef.current]);

  // Change the year by the slider 
  const changeRangeYear = (e: { detail: { value: any; }; }) => {
    const newValue = e.detail.value;
    setYear(newValue);
  };

  const handlePayoutChange = (e: CustomEvent) => {
    setPayout(e.detail.value);
  };

  const handleImigrantsChange = (e: CustomEvent) => {
    setImigrants(e.detail.value);
  };

  const handleBirthRateChange = (e: CustomEvent) => {
    setBirthRate(e.detail.value);
  };
  

   
  // animation 
  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (isAnimating) {
      interval = setInterval(() => {
        setYear(prevYear => {
          if (prevYear >= 2070) {
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
    // @ts-ignore
    setDataset(Dataset[year])
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
            <IonCol size-sm="12" size-md="8" ref={elementWidthRef}>
              <IonRow>
                <Chart
                    chartType="BarChart"
                    data={dataset}
                    options={options}
                    width={dimensions.width}
                    height={dimensions.height}
                    legendToggle
                  />
              </IonRow>
              <IonRow>
                <IonCol className="center-text" size-sm="12" size-md="2">
                  {isAnimating ?
                  <IonIcon className='ranger-padding' color="primary" onClick={stopAnimation} icon={stopCircle} size="large"></IonIcon>:
                  <IonIcon className='ranger-padding' color="primary" onClick={startAnimation} icon={playCircle} size="large"></IonIcon>}
                </IonCol>
                <IonCol size-sm="12" size-md="8">
                    <IonRange
                      min={1950}
                      max={2070}
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
            </IonCol>
            <IonCol>
              <IonTitle className="title-inputs">Inputs: </IonTitle>

              <IonTitle className="title-style">Payout for pensioners</IonTitle>
              <IonInput
                className='input-style'
                value={payout}
                placeholder="Enter payout for pensioners"
                onIonChange={handlePayoutChange}
              />

              <IonTitle className="title-style">Number of imigrants</IonTitle>
              <IonInput
                className='input-style'
                value={imigrants}
                placeholder="Enter payout for pensioners"
                onIonChange={handleImigrantsChange}
              />

              <IonTitle className="title-style">Birth rate</IonTitle>
              <IonInput
                className='input-style'
                value={birthRate}
                placeholder="Enter payout for pensioners"
                onIonChange={handleBirthRateChange}
              />
            </IonCol>
          </IonRow>

      </IonGrid>



      </IonContent>
    </IonPage>
  );
};

export default Tab2;
