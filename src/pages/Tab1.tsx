import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { ResponsiveAreaBump } from '@nivo/bump'
import { useState } from 'react';
import { ResponsiveChoropleth } from '@nivo/geo';
import continens from "../Continents.json";
import { ResponsiveTreeMap } from '@nivo/treemap';
import { ResponsiveWaffle } from '@nivo/waffle';

const Tab1: React.FC = () => {

  const dataFirstLevel = [
    {
      "id": "Inflow",
      "data": [
        {
          "x": 2000,
          "y": 110303
        },
        {
          "x": 2001,
          "y": 125790
        },
        {
          "x": 2002,
          "y": 130622
        },
        {
          "x": 2003,
          "y": 142280
        },
        {
          "x": 2004,
          "y": 154264
        },
        {
          "x": 2005,
          "y": 147795
        },
        {
          "x": 2006,
          "y": 137944
        },
        {
          "x": 2007,
          "y": 148189
        },
        {
          "x": 2008,
          "y": 154594
        },
        {
          "x": 2009,
          "y": 156451
        },
        {
          "x": 2010,
          "y": 163434
        },
        {
          "x": 2011,
          "y": 181091
        },
        {
          "x": 2012,
          "y": 198264
        },
        {
          "x": 2013,
          "y": 207618
        },
        {
          "x": 2014,
          "y": 228372
        },
        {
          "x": 2015,
          "y": 275622
        },
        {
          "x": 2016,
          "y": 245647
        },
        {
          "x": 2017,
          "y": 226929
        },
        {
          "x": 2018,
          "y": 221694
        },
        {
          "x": 2019,
          "y": 223319
        },
        {
          "x": 2020,
          "y": 199465
        },
        {
          "x": 2021,
          "y": 222591
        }
      ]
    },
    {
      "id": "Outflow",
      "data": [
        {
          "x": 2000,
          "y": 24320
        },
        {
          "x": 2001,
          "y": 31731
        },
        {
          "x": 2002,
          "y": 36011
        },
        {
          "x": 2003,
          "y": 44694
        },
        {
          "x": 2004,
          "y": 41645
        },
        {
          "x": 2005,
          "y": 34876
        },
        {
          "x": 2006,
          "y": 25746
        },
        {
          "x": 2007,
          "y": 14010
        },
        {
          "x": 2008,
          "y": 10258
        },
        {
          "x": 2009,
          "y": 7978
        },
        {
          "x": 2010,
          "y": 6135
        },
        {
          "x": 2011,
          "y": 6690
        },
        {
          "x": 2012,
          "y": 6620
        },
        {
          "x": 2013,
          "y": 6486
        },
        {
          "x": 2014,
          "y": 7189
        },
        {
          "x": 2015,
          "y": 7603
        },
        {
          "x": 2016,
          "y": 8074
        },
        {
          "x": 2017,
          "y": 8462
        },
        {
          "x": 2018,
          "y": 8769
        },
        {
          "x": 2019,
          "y": 9812
        },
        {
          "x": 2020,
          "y": 8469
        },
        {
          "x": 2021,
          "y": 15597
        }
      ]
    }
  ]

  const inflowContinents =
  [
    {
      "id": "Africa",
      "data": [
        { "x": 2000, "y": 4486 },
        { "x": 2001, "y": 4453 },
        { "x": 2002, "y": 6327 },
        { "x": 2003, "y": 7372 },
        { "x": 2004, "y": 7996 },
        { "x": 2005, "y": 6521 },
        { "x": 2006, "y": 5545 },
        { "x": 2007, "y": 5560 },
        { "x": 2008, "y": 5578 },
        { "x": 2009, "y": 6114 },
        { "x": 2010, "y": 6051 },
        { "x": 2011, "y": 6289 },
        { "x": 2012, "y": 6236 },
        { "x": 2013, "y": 6414 },
        { "x": 2014, "y": 7618 },
        { "x": 2015, "y": 9736 },
        { "x": 2016, "y": 11133 },
        { "x": 2017, "y": 9355 },
        { "x": 2018, "y": 6782 },
        { "x": 2019, "y": 6266 },
        { "x": 2020, "y": 5134 },
        { "x": 2021, "y": 6542 }
      ]
    },
    {
      "id": "Asia",
      "data": [
        { "x": 2000, "y": 24985 },
        { "x": 2001, "y": 24697 },
        { "x": 2002, "y": 29826 },
        { "x": 2003, "y": 29985 },
        { "x": 2004, "y": 27630 },
        { "x": 2005, "y": 26120 },
        { "x": 2006, "y": 22953 },
        { "x": 2007, "y": 24276 },
        { "x": 2008, "y": 24302 },
        { "x": 2009, "y": 26016 },
        { "x": 2010, "y": 24670 },
        { "x": 2011, "y": 26050 },
        { "x": 2012, "y": 29990 },
        { "x": 2013, "y": 30456 },
        { "x": 2014, "y": 37158 },
        { "x": 2015, "y": 82952 },
        { "x": 2016, "y": 58566 },
        { "x": 2017, "y": 39045 },
        { "x": 2018, "y": 33122 },
        { "x": 2019, "y": 31316 },
        { "x": 2020, "y": 25685 },
        { "x": 2021, "y": 38616 }
      ]
    },
    {
      "id": "Europe",
      "data": [
        { "x": 2000, "y": 76328 },
        { "x": 2001, "y": 91922 },
        { "x": 2002, "y": 87619 },
        { "x": 2003, "y": 98284 },
        { "x": 2004, "y": 111859 },
        { "x": 2005, "y": 108310 },
        { "x": 2006, "y": 102796 },
        { "x": 2007, "y": 111121 },
        { "x": 2008, "y": 117392 },
        { "x": 2009, "y": 116936 },
        { "x": 2010, "y": 125580 },
        { "x": 2011, "y": 141278 },
        { "x": 2012, "y": 154388 },
        { "x": 2013, "y": 163216 },
        { "x": 2014, "y": 175307 },
        { "x": 2015, "y": 173122 },
        { "x": 2016, "y": 167031 },
        { "x": 2017, "y": 169420 },
        { "x": 2018, "y": 172480 },
        { "x": 2019, "y": 176577 },
        { "x": 2020, "y": 161335 },
        { "x": 2021, "y": 169646 }
      ]
    },
    {
      "id": "North America",
      "data": [
        { "x": 2000, "y": 2658 },
        { "x": 2001, "y": 2852 },
        { "x": 2002, "y": 3498 },
        { "x": 2003, "y": 3430 },
        { "x": 2004, "y": 3637 },
        { "x": 2005, "y": 3901 },
        { "x": 2006, "y": 3994 },
        { "x": 2007, "y": 4522 },
        { "x": 2008, "y": 4570 },
        { "x": 2009, "y": 4652 },
        { "x": 2010, "y": 4550 },
        { "x": 2011, "y": 4937 },
        { "x": 2012, "y": 4959 },
        { "x": 2013, "y": 4935 },
        { "x": 2014, "y": 5001 },
        { "x": 2015, "y": 5356 },
        { "x": 2016, "y": 5391 },
        { "x": 2017, "y": 5625 },
        { "x": 2018, "y": 5710 },
        { "x": 2019, "y": 5632 },
        { "x": 2020, "y": 4249 },
        { "x": 2021, "y": 4320 }
      ]
    },
    {
      "id": "Oceania",
      "data": [
        { "x": 2000, "y": 525 },
        { "x": 2001, "y": 520 },
        { "x": 2002, "y": 491 },
        { "x": 2003, "y": 451 },
        { "x": 2004, "y": 517 },
        { "x": 2005, "y": 454 },
        { "x": 2006, "y": 491 },
        { "x": 2007, "y": 546 },
        { "x": 2008, "y": 585 },
        { "x": 2009, "y": 594 },
        { "x": 2010, "y": 571 },
        { "x": 2011, "y": 602 },
        { "x": 2012, "y": 586 },
        { "x": 2013, "y": 560 },
        { "x": 2014, "y": 576 },
        { "x": 2015, "y": 619 },
        { "x": 2016, "y": 615 },
        { "x": 2017, "y": 533 },
        { "x": 2018, "y": 608 },
        { "x": 2019, "y": 597 },
        { "x": 2020, "y": 503 },
        { "x": 2021, "y": 428 }
      ]
    },
    {
      "id": "South America",
      "data": [
        { "x": 2000, "y": 1036 },
        { "x": 2001, "y": 1141 },
        { "x": 2002, "y": 1318 },
        { "x": 2003, "y": 1467 },
        { "x": 2004, "y": 1456 },
        { "x": 2005, "y": 1502 },
        { "x": 2006, "y": 1379 },
        { "x": 2007, "y": 1633 },
        { "x": 2008, "y": 1582 },
        { "x": 2009, "y": 1704 },
        { "x": 2010, "y": 1592 },
        { "x": 2011, "y": 1568 },
        { "x": 2012, "y": 1712 },
        { "x": 2013, "y": 1626 },
        { "x": 2014, "y": 1662 },
        { "x": 2015, "y": 1723 },
        { "x": 2016, "y": 1908 },
        { "x": 2017, "y": 2147 },
        { "x": 2018, "y": 2352 },
        { "x": 2019, "y": 2517 },
        { "x": 2020, "y": 2122 },
        { "x": 2021, "y": 2387 }
      ]
    },
    {
      "id": "Unknown",
      "data": [
        { "x": 2000, "y": 285 },
        { "x": 2001, "y": 205 },
        { "x": 2002, "y": 1543 },
        { "x": 2003, "y": 1291 },
        { "x": 2004, "y": 1169 },
        { "x": 2005, "y": 987 },
        { "x": 2006, "y": 786 },
        { "x": 2007, "y": 531 },
        { "x": 2008, "y": 585 },
        { "x": 2009, "y": 435 },
        { "x": 2010, "y": 420 },
        { "x": 2011, "y": 367 },
        { "x": 2012, "y": 393 },
        { "x": 2013, "y": 411 },
        { "x": 2014, "y": 1050 },
        { "x": 2015, "y": 2114 },
        { "x": 2016, "y": 1003 },
        { "x": 2017, "y": 804 },
        { "x": 2018, "y": 640 },
        { "x": 2019, "y": 414 },
        { "x": 2020, "y": 437 },
        { "x": 2021, "y": 652 }
      ]
    }
  ]

  const outflowContinents =
  [
    {
      "id": "Africa",
      "data": [
        { "x": 2000, "y": 1366 },
        { "x": 2001, "y": 1787 },
        { "x": 2002, "y": 1470 },
        { "x": 2003, "y": 1696 },
        { "x": 2004, "y": 1912 },
        { "x": 2005, "y": 1743 },
        { "x": 2006, "y": 1092 },
        { "x": 2007, "y": 380 },
        { "x": 2008, "y": 373 },
        { "x": 2009, "y": 384 },
        { "x": 2010, "y": 366 },
        { "x": 2011, "y": 391 },
        { "x": 2012, "y": 437 },
        { "x": 2013, "y": 426 },
        { "x": 2014, "y": 697 },
        { "x": 2015, "y": 783 },
        { "x": 2016, "y": 777 },
        { "x": 2017, "y": 928 },
        { "x": 2018, "y": 890 },
        { "x": 2019, "y": 964 },
        { "x": 2020, "y": 633 },
        { "x": 2021, "y": 626 }
      ]
    },
    {
      "id": "Asia",
      "data": [
        { "x": 2000, "y": 9876 },
        { "x": 2001, "y": 13451 },
        { "x": 2002, "y": 15826 },
        { "x": 2003, "y": 16547 },
        { "x": 2004, "y": 16395 },
        { "x": 2005, "y": 12558 },
        { "x": 2006, "y": 9211 },
        { "x": 2007, "y": 2742 },
        { "x": 2008, "y": 2469 },
        { "x": 2009, "y": 1988 },
        { "x": 2010, "y": 1577 },
        { "x": 2011, "y": 2120 },
        { "x": 2012, "y": 2307 },
        { "x": 2013, "y": 2065 },
        { "x": 2014, "y": 2351 },
        { "x": 2015, "y": 2604 },
        { "x": 2016, "y": 2637 },
        { "x": 2017, "y": 2838 },
        { "x": 2018, "y": 2742 },
        { "x": 2019, "y": 3078 },
        { "x": 2020, "y": 2893 },
        { "x": 2021, "y": 6323 }
      ]
    },
    {
      "id": "Europe",
      "data": [
        { "x": 2000, "y": 12615 },
        { "x": 2001, "y": 16040 },
        { "x": 2002, "y": 18319 },
        { "x": 2003, "y": 25957 },
        { "x": 2004, "y": 22727 },
        { "x": 2005, "y": 20007 },
        { "x": 2006, "y": 15107 },
        { "x": 2007, "y": 10681 },
        { "x": 2008, "y": 7145 },
        { "x": 2009, "y": 5328 },
        { "x": 2010, "y": 4020 },
        { "x": 2011, "y": 3980 },
        { "x": 2012, "y": 3677 },
        { "x": 2013, "y": 3759 },
        { "x": 2014, "y": 3891 },
        { "x": 2015, "y": 3959 },
        { "x": 2016, "y": 4383 },
        { "x": 2017, "y": 4382 },
        { "x": 2018, "y": 4851 },
        { "x": 2019, "y": 5403 },
        { "x": 2020, "y": 4559 },
        { "x": 2021, "y": 5841 }
      ]
    },
    {
      "id": "North America",
      "data": [
        { "x": 2000, "y": 156 },
        { "x": 2001, "y": 179 },
        { "x": 2002, "y": 163 },
        { "x": 2003, "y": 158 },
        { "x": 2004, "y": 229 },
        { "x": 2005, "y": 232 },
        { "x": 2006, "y": 138 },
        { "x": 2007, "y": 93 },
        { "x": 2008, "y": 123 },
        { "x": 2009, "y": 127 },
        { "x": 2010, "y": 72 },
        { "x": 2011, "y": 92 },
        { "x": 2012, "y": 95 },
        { "x": 2013, "y": 97 },
        { "x": 2014, "y": 107 },
        { "x": 2015, "y": 91 },
        { "x": 2016, "y": 127 },
        { "x": 2017, "y": 124 },
        { "x": 2018, "y": 116 },
        { "x": 2019, "y": 106 },
        { "x": 2020, "y": 179 },
        { "x": 2021, "y": 1954 }
      ]
    },
    {
      "id": "Oceania",
      "data": [
        { "x": 2000, "y": 11 },
        { "x": 2001, "y": 3 },
        { "x": 2002, "y": 4 },
        { "x": 2003, "y": 13 },
        { "x": 2004, "y": 13 },
        { "x": 2005, "y": 7 },
        { "x": 2006, "y": 8 },
        { "x": 2007, "y": 9 },
        { "x": 2008, "y": 9 },
        { "x": 2009, "y": 6 },
        { "x": 2010, "y": 4 },
        { "x": 2011, "y": 5 },
        { "x": 2012, "y": 3 },
        { "x": 2013, "y": 6 },
        { "x": 2014, "y": 8 },
        { "x": 2015, "y": 1 },
        { "x": 2016, "y": 12 },
        { "x": 2017, "y": 4 },
        { "x": 2018, "y": 2 },
        { "x": 2019, "y": 0 },
        { "x": 2020, "y": 5 },
        { "x": 2021, "y": 140 }
      ]
    },
    {
      "id": "South America",
      "data": [
        { "x": 2000, "y": 141 },
        { "x": 2001, "y": 128 },
        { "x": 2002, "y": 139 },
        { "x": 2003, "y": 164 },
        { "x": 2004, "y": 204 },
        { "x": 2005, "y": 190 },
        { "x": 2006, "y": 125 },
        { "x": 2007, "y": 67 },
        { "x": 2008, "y": 75 },
        { "x": 2009, "y": 91 },
        { "x": 2010, "y": 63 },
        { "x": 2011, "y": 71 },
        { "x": 2012, "y": 77 },
        { "x": 2013, "y": 91 },
        { "x": 2014, "y": 96 },
        { "x": 2015, "y": 115 },
        { "x": 2016, "y": 99 },
        { "x": 2017, "y": 130 },
        { "x": 2018, "y": 122 },
        { "x": 2019, "y": 170 },
        { "x": 2020, "y": 118 },
        { "x": 2021, "y": 615 }
      ]
    },
    {
      "id": "Unknown",
      "data": [
        { "x": 2000, "y": 155 },
        { "x": 2001, "y": 143 },
        { "x": 2002, "y": 90 },
        { "x": 2003, "y": 159 },
        { "x": 2004, "y": 165 },
        { "x": 2005, "y": 139 },
        { "x": 2006, "y": 65 },
        { "x": 2007, "y": 38 },
        { "x": 2008, "y": 64 },
        { "x": 2009, "y": 54 },
        { "x": 2010, "y": 33 },
        { "x": 2011, "y": 31 },
        { "x": 2012, "y": 24 },
        { "x": 2013, "y": 42 },
        { "x": 2014, "y": 39 },
        { "x": 2015, "y": 50 },
        { "x": 2016, "y": 39 },
        { "x": 2017, "y": 56 },
        { "x": 2018, "y": 46 },
        { "x": 2019, "y": 91 },
        { "x": 2020, "y": 82 },
        { "x": 2021, "y": 98 }
      ]
    }
  ]

  const asiaWaffel = [
    {
      "id": "managers",
      "label": "Legislators, senior officials and managers",
      "value": 3095 / 36272 * 100
    },
    {
      "id": "professionals",
      "label": "Professionals",
      "value": 3210 / 36272 * 100
    },
    {
      "id": "technicians",
      "label": "Technicians and associate professionals",
      "value": 5799 / 36272 * 100
    },
    {
      "id": "clerks",
      "label": "Clerks",
      "value": 2911 / 36272 * 100
    },
    {
      "id": "service_workers",
      "label": "Service workers and shop and market sales workers",
      "value": 9091 / 36272 * 100
    },
    {
      "id": "skilled_agricultural",
      "label": "Skilled agricultural and fishery workers",
      "value": 101 / 36272 * 100
    },
    {
      "id": "trades_workers",
      "label": "Craft and related trades workers",
      "value": 2221 / 36272 * 100
    },
    {
      "id": "machine_operators",
      "label": "Plant and machine operators and assemblers",
      "value": 2124 / 36272 * 100
    },
    {
      "id": "elementary",
      "label": "Elementary occupations",
      "value": 7586 / 36272 * 100
    },
    {
      "id": "armed_forces",
      "label": "Armed forces",
      "value": 155 / 36272 * 100
    },
  ]

  const dataTree = {
    "name": "World",
    "children": [
      {
        "name": "Africa",
        "children": [
          {"name": "Legislators", "loc": 1154},
          {"name": "Professionals", "loc": 1086},
          {"name": "Technicians and associate professionals", "loc": 1754},
          {"name": "Clerks", "loc": 1108},
          {"name": "Service workers and shop and market sales workers", "loc": 2336},
          {"name": "Skilled agricultural and fishery workers", "loc": 49},
          {"name": "Craft and related trades workers", "loc": 1159},
          {"name": "Plant and machine operators and assemblers", "loc": 1250},
          {"name": "Elementary occupations", "loc": 3816},
          {"name": "Armed forces", "loc": 62}
        ]
      },
      {
        "name": "Asia",
        "children": [
          {"name": "Legislators", "loc": 3074},
          {"name": "Professionals", "loc": 3210},
          {"name": "Technicians and associate professionals", "loc": 5799},
          {"name": "Clerks", "loc": 2911},
          {"name": "Service workers and shop and market sales workers", "loc": 9091},
          {"name": "Skilled agricultural and fishery workers", "loc": 101},
          {"name": "Craft and related trades workers", "loc": 2221},
          {"name": "Plant and machine operators and assemblers", "loc": 2124},
          {"name": "Elementary occupations", "loc": 7586},
          {"name": "Armed forces", "loc": 155}
        ]
      },
      {
        "name": "Europe",
        "children": [
          {"name": "Legislators", "loc": 308350},
          {"name": "Professionals", "loc": 300463},
          {"name": "Technicians and associate professionals", "loc": 697828},
          {"name": "Clerks", "loc": 492764},
          {"name": "Service workers and shop and market sales workers", "loc": 481201},
          {"name": "Skilled agricultural and fishery workers", "loc": 138706},
          {"name": "Craft and related trades workers", "loc": 516837},
          {"name": "Plant and machine operators and assemblers", "loc": 262002},
          {"name": "Elementary occupations", "loc": 430877},
          {"name": "Armed forces", "loc": 40670}
        ]
      },
      {
        "name": "North America",
        "children": [
          {"name": "Legislators", "loc": 557},
          {"name": "Professionals", "loc": 1353},
          {"name": "Technicians and associate professionals", "loc": 938},
          {"name": "Clerks", "loc": 509},
          {"name": "Service workers and shop and market sales workers", "loc": 479},
          {"name": "Skilled agricultural and fishery workers", "loc": 33},
          {"name": "Craft and related trades workers", "loc": 225},
          {"name": "Plant and machine operators and assemblers", "loc": 146},
          {"name": "Elementary occupations", "loc": 318},
          {"name": "Armed forces", "loc": 19}
        ]
      },
      {
        "name": "Oceania",
        "children": [
          {"name": "Legislators", "loc": 106},
          {"name": "Professionals", "loc": 189},
          {"name": "Technicians and associate professionals", "loc": 296},
          {"name": "Clerks", "loc": 162},
          {"name": "Service workers and shop and market sales workers", "loc": 182},
          {"name": "Skilled agricultural and fishery workers", "loc": 9},
          {"name": "Craft and related trades workers", "loc": 131},
          {"name": "Plant and machine operators and assemblers", "loc": 57},
          {"name": "Elementary occupations", "loc": 116},
          {"name": "Armed forces", "loc": 8}
        ]
      },
      {
        "name": "South America",
        "children": [
          {"name": "Legislators", "loc": 348},
          {"name": "Professionals", "loc": 729},
          {"name": "Technicians and associate professionals", "loc": 971},
          {"name": "Clerks", "loc": 587},
          {"name": "Service workers and shop and market sales workers", "loc": 1050},
          {"name": "Skilled agricultural and fishery workers", "loc": 26},
          {"name": "Craft and related trades workers", "loc": 321},
          {"name": "Plant and machine operators and assemblers", "loc": 256},
          {"name": "Elementary occupations", "loc": 1218},
          {"name": "Armed forces", "loc": 35}
        ]
      },
      {
        "name": "unknown",
        "children": [
          {"name": "Legislators", "loc": 42},
          {"name": "Professionals", "loc": 27},
          {"name": "Technicians and associate professionals", "loc": 63},
          {"name": "Clerks", "loc": 39},
          {"name": "Service workers and shop and market sales workers", "loc": 88},
          {"name": "Skilled agricultural and fishery workers", "loc": 4},
          {"name": "Craft and related trades workers", "loc": 33},
          {"name": "Plant and machine operators and assemblers", "loc": 31},
          {"name": "Elementary occupations", "loc": 96},
          {"name": "Armed forces", "loc": 3}
        ]
      }
    ]
  };
  

  const changeData = (id: string) => {
    console.log('id: ' + id)
    switch (id) {
      case "Inflow":
        setSelectedData(inflowContinents)
        setTitleText("The inflow of immigrants by continents")
        break;
      case "Outflow":
        setSelectedData(outflowContinents)
        setTitleText("The outflow of immigrants by continents")
        break;
        case "Asia":
          setChartType("WAFFEL")
          setSelectedWaffle(asiaWaffel)
          setTitleText("The number of immigrants by occupancy")
          break;
      default:
        setChartType("BUMP")
        setSelectedData(dataFirstLevel)
        setTitleText("The evolution of immigration numbers")
        break;
  }
  }

  const [selectedData, setSelectedData] = useState(dataFirstLevel);
  const [chartType, setChartType] = useState("BUMP");
  const [selectedWaffle, setSelectedWaffle] = useState(asiaWaffel);
  const [titleText, setTitleText] = useState("The evolution of immigration numbers");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle><span>{"Nivo - " + titleText}</span> {chartType === "WAFFEL" && <span className='title_button' onClick={() => {setChartType("TREE")}}>View all </span>}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Nivo</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <ExploreContainer name="Tab 1 page" /> */}
        {chartType === "BUMP" && <ResponsiveAreaBump
        data={selectedData}
        margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
        spacing={8}
        theme={{"tooltip": {"container": {"color": "#4c4343"}}}}
        colors={{ scheme: 'pastel2' }}
        blendMode="multiply"
        onClick={(serie) => {changeData(serie.id)}}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'CoffeeScript'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'TypeScript'
                },
                id: 'lines'
            }
        ]}
        startLabel={true}
        endLabel={false}
        axisTop={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: -36
        }}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        />}


        {chartType === "TREE" &&<ResponsiveTreeMap
        data={dataTree}
        identity="name"
        value="loc"
        valueFormat=".02s"
        theme={{"tooltip": {"container": {"color": "#4c4343"}}}}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        onClick={(serie) => {changeData(serie.pathComponents[1])}}
        labelSkipSize={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.2
                ]
            ]
        }}
        parentLabelPosition="left"
        parentLabelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.1
                ]
            ]
        }}
        />}

        {chartType === "WAFFEL" && <ResponsiveWaffle
          data={selectedWaffle}
          total={100}
          rows={18}
          columns={14}
          padding={1}
          theme={{"tooltip": {"container": {"color": "#4c4343"}}}}
          valueFormat=".2f"
          margin={{ top: 10, right: 10, bottom: 10, left: 120 }}
          colors={{ scheme: 'pastel2' }}
          borderRadius={3}
          borderColor={{
              from: 'color',
              modifiers: [
                  [
                      'darker',
                      0.3
                  ]
              ]
          }}
          motionStagger={2}
          legends={[
              {
                  anchor: 'top-left',
                  direction: 'column',
                  justify: false,
                  translateX: -100,
                  translateY: 0,
                  itemsSpacing: 4,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: 'left-to-right',
                  itemOpacity: 1,
                  itemTextColor: '#777',
                  symbolSize: 20,
                  effects: [
                      {
                          on: 'hover',
                          style: {
                              itemTextColor: '#000',
                              itemBackground: '#f7fafb'
                          }
                      }
                  ]
              }
          ]}
        />}

        {/* <ResponsiveChoropleth
          data={data}
          features={[continens.features]}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          colors="nivo"
          domain={[ 0, 1 ]}
          unknownColor="#666666"
          label="properties.name"
          valueFormat=".2s"
          projectionTranslation={[ 0.5, 0.5 ]}
          projectionRotation={[ 0, 0, 0 ]}
          enableGraticule={true}
          graticuleLineColor="#dddddd"
          borderWidth={0.5}
          borderColor="#152538"
          // defs={[
          //     {
          //         id: 'dots',
          //         type: 'patternDots',
          //         background: 'inherit',
          //         color: '#38bcb2',
          //         size: 4,
          //         padding: 1,
          //         stagger: true
          //     },
          //     {
          //         id: 'lines',
          //         type: 'patternLines',
          //         background: 'inherit',
          //         color: '#eed312',
          //         rotation: -45,
          //         lineWidth: 6,
          //         spacing: 10
          //     },
          //     {
          //         id: 'gradient',
          //         type: 'linearGradient',
          //         colors: [
          //             {
          //                 offset: 0,
          //                 color: '#000'
          //             },
          //             {
          //                 offset: 100,
          //                 color: 'inherit'
          //             }
          //         ]
          //     }
          // ]}
          // fill={[
          //     {
          //         match: {
          //             id: 'CAN'
          //         },
          //         id: 'dots'
          //     },
          //     {
          //         match: {
          //             id: 'CHN'
          //         },
          //         id: 'lines'
          //     },
          //     {
          //         match: {
          //             id: 'ATA'
          //         },
          //         id: 'gradient'
          //     }
          // ]}
          legends={[
              {
                  anchor: 'bottom-left',
                  direction: 'column',
                  justify: true,
                  translateX: 20,
                  translateY: -100,
                  itemsSpacing: 0,
                  itemWidth: 94,
                  itemHeight: 18,
                  itemDirection: 'left-to-right',
                  itemTextColor: '#444444',
                  itemOpacity: 0.85,
                  symbolSize: 18,
                  effects: [
                      {
                          on: 'hover',
                          style: {
                              itemTextColor: '#000000',
                              itemOpacity: 1
                          }
                      }
                  ]
              }
          ]}
        /> */}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
