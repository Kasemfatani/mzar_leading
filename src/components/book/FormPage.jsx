'use client'
import React, { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import ReCAPTCHA from "react-google-recaptcha"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import validator from "validator";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import PhnoeInput from 'react-phone-number-input'; // Importing a phone number input component.
import { useSearchParams } from 'next/navigation'; // Import hook
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { motion } from 'framer-motion'; // Importing the motion component from Framer Motion for animations
import axios from 'axios';
import Loading from '@/app/loading';
import { API_BASE_URL } from '@/lib/apiConfig';
export default function FormPage(props) {
    const router = useRouter()
    const searchParams = useSearchParams(); // Get URL parameters
    const [gclid, setGclid] = useState(null); // Store GCLID

    useEffect(() => {
        // Extract GCLID from URL if available
        const gclidParam = searchParams.get("gclid");
        if (gclidParam) {
            setGclid(gclidParam); // Save it in state
        }
    }, [searchParams]); 
    console.log(gclid);
    console.log(searchParams.get("gclid"));
    
    
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [language, setLanguage] = useState('en');  // Default language is 'en'
    let [passedData, setPassedData] = useState({});
    const sendPostRequest = async (data, code) => {
        let formData = `${data?.date.getFullYear()}-${data?.date.getMonth() + 1}-${data?.date.getDate()}`;
        let direct = data?.destniation.split('-');
        const url = `${API_BASE_URL}/landing/home/booking`;
        const queryParams = {
            customer_name: data?.name,
            customer_whatsapp: data?.phone,
            package_id: direct[0],
            papackage_name: direct[1],
            booking_date: formData,
            country_key: code,
            gclid: gclid
        };
        console.log(queryParams);
        
        return axios({
            method: 'post',
            url: url,
            data: queryParams,
            headers: {
                lang: 'en',
            },
        })
        .then(response => {
            // setDone(true);
            router.push(`/congats?name=${data?.name}&phone=${data?.phone}&package=${direct[1]}&gclid=${gclid}`);
            // router.push(`/congats`);
            // document.querySelector('html').style.overflow = 'hidden';
            // const interval = setInterval(() => {
            //     // setDone(false);
            //     // document.querySelector('html').style.overflow = 'auto';
            //     clearInterval(interval);
            // }, 3000);
        })
    };
    useEffect(() => {
        setLoading(true);
        if (typeof window !== 'undefined') {
            setLanguage(localStorage.getItem('lang'));
            // Define the headers with the selected language
            const headers = {
                lang: localStorage.getItem('lang'), // Change language dynamically based on state
            };
            // Fetch data from the API with Axios
            axios.get(`${API_BASE_URL}/landing/home/packages`
                , {
                    headers: headers,
                }).then(response => {
                    setData(response.data);  // Set the response data to state
                    setLoading(false);  // Set loading to false

                })
                .catch(error => {
                    setError(error);  // Handle any errors
                    console.error('Error fetching data:', error);
                    setLoading(false)
                });
        }
    }, []);  // Run this effect whenever the `language` changes
    
    // const [date, setDate] = React.useState<Date>()
    const [date, setDate] = useState(new Date());
    const [visited, setVisited] = useState(false);
    const [captchaa, setCaptchaa] = useState(false);
    function onChange(value) {
        setCaptchaa(true);
    }
    const formSchema = z.object({

        name: z.string().min(1, { message: "Name is required" }).max(50, { message: "Name must be at most 50 characters" }),
        phone: z.string().refine(validator.isMobilePhone, { message: "Invalid phone number" }),
        date: z.date(),
        destniation: z.string().min(1, { message: "Destniation is required" }).optional(),
    })
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            phone: '',
            date: date,
            destniation: '',
            // captcha: '',
        },
    });
    const Submit = (data) => {
        let code = '';
        for (let index = 0; index < countriesCodes.length; index++) {
            if (countriesCodes[index].code == document.querySelector(".PhoneInputCountrySelect").value) {
                code = (countriesCodes[index].dial_code);
            }
        }
        setVisited(true);
        if (captchaa) {
            let formData = `${data.date.getDate()}-${data.date.getMonth() + 1}-${data.date.getFullYear()}`;
            // **Push data to GTM dataLayer**
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'form_submission',
                customer_name: data.name,
                customer_whatsapp: data.phone,
                package_id: data.destniation.split('-')[0],
                package_name: data.destniation.split('-')[1],
                booking_date: formData,
                country_key: code,
                gclid: gclid // Pass GCLID here
            });

            console.log("Data Layer Updated:", window.dataLayer);

            sendPostRequest(data, code);

        }
    };
    let countriesCodes = [
        {
            "name": "Afghanistan",
            "dial_code": "+93",
            "code": "AF"
        },
        {
            "name": "Aland Islands",
            "dial_code": "+358",
            "code": "AX"
        },
        {
            "name": "Albania",
            "dial_code": "+355",
            "code": "AL"
        },
        {
            "name": "Algeria",
            "dial_code": "+213",
            "code": "DZ"
        },
        {
            "name": "AmericanSamoa",
            "dial_code": "+1684",
            "code": "AS"
        },
        {
            "name": "Andorra",
            "dial_code": "+376",
            "code": "AD"
        },
        {
            "name": "Angola",
            "dial_code": "+244",
            "code": "AO"
        },
        {
            "name": "Anguilla",
            "dial_code": "+1264",
            "code": "AI"
        },
        {
            "name": "Antarctica",
            "dial_code": "+672",
            "code": "AQ"
        },
        {
            "name": "Antigua and Barbuda",
            "dial_code": "+1268",
            "code": "AG"
        },
        {
            "name": "Argentina",
            "dial_code": "+54",
            "code": "AR"
        },
        {
            "name": "Armenia",
            "dial_code": "+374",
            "code": "AM"
        },
        {
            "name": "Aruba",
            "dial_code": "+297",
            "code": "AW"
        },
        {
            "name": "Australia",
            "dial_code": "+61",
            "code": "AU"
        },
        {
            "name": "Austria",
            "dial_code": "+43",
            "code": "AT"
        },
        {
            "name": "Azerbaijan",
            "dial_code": "+994",
            "code": "AZ"
        },
        {
            "name": "Bahamas",
            "dial_code": "+1242",
            "code": "BS"
        },
        {
            "name": "Bahrain",
            "dial_code": "+973",
            "code": "BH"
        },
        {
            "name": "Bangladesh",
            "dial_code": "+880",
            "code": "BD"
        },
        {
            "name": "Barbados",
            "dial_code": "+1246",
            "code": "BB"
        },
        {
            "name": "Belarus",
            "dial_code": "+375",
            "code": "BY"
        },
        {
            "name": "Belgium",
            "dial_code": "+32",
            "code": "BE"
        },
        {
            "name": "Belize",
            "dial_code": "+501",
            "code": "BZ"
        },
        {
            "name": "Benin",
            "dial_code": "+229",
            "code": "BJ"
        },
        {
            "name": "Bermuda",
            "dial_code": "+1441",
            "code": "BM"
        },
        {
            "name": "Bhutan",
            "dial_code": "+975",
            "code": "BT"
        },
        {
            "name": "Bolivia, Plurinational State of",
            "dial_code": "+591",
            "code": "BO"
        },
        {
            "name": "Bosnia and Herzegovina",
            "dial_code": "+387",
            "code": "BA"
        },
        {
            "name": "Botswana",
            "dial_code": "+267",
            "code": "BW"
        },
        {
            "name": "Brazil",
            "dial_code": "+55",
            "code": "BR"
        },
        {
            "name": "British Indian Ocean Territory",
            "dial_code": "+246",
            "code": "IO"
        },
        {
            "name": "Brunei Darussalam",
            "dial_code": "+673",
            "code": "BN"
        },
        {
            "name": "Bulgaria",
            "dial_code": "+359",
            "code": "BG"
        },
        {
            "name": "Burkina Faso",
            "dial_code": "+226",
            "code": "BF"
        },
        {
            "name": "Burundi",
            "dial_code": "+257",
            "code": "BI"
        },
        {
            "name": "Cambodia",
            "dial_code": "+855",
            "code": "KH"
        },
        {
            "name": "Cameroon",
            "dial_code": "+237",
            "code": "CM"
        },
        {
            "name": "Canada",
            "dial_code": "+1",
            "code": "CA"
        },
        {
            "name": "Cape Verde",
            "dial_code": "+238",
            "code": "CV"
        },
        {
            "name": "Cayman Islands",
            "dial_code": "+ 345",
            "code": "KY"
        },
        {
            "name": "Central African Republic",
            "dial_code": "+236",
            "code": "CF"
        },
        {
            "name": "Chad",
            "dial_code": "+235",
            "code": "TD"
        },
        {
            "name": "Chile",
            "dial_code": "+56",
            "code": "CL"
        },
        {
            "name": "China",
            "dial_code": "+86",
            "code": "CN"
        },
        {
            "name": "Christmas Island",
            "dial_code": "+61",
            "code": "CX"
        },
        {
            "name": "Cocos (Keeling) Islands",
            "dial_code": "+61",
            "code": "CC"
        },
        {
            "name": "Colombia",
            "dial_code": "+57",
            "code": "CO"
        },
        {
            "name": "Comoros",
            "dial_code": "+269",
            "code": "KM"
        },
        {
            "name": "Congo",
            "dial_code": "+242",
            "code": "CG"
        },
        {
            "name": "Congo, The Democratic Republic of the Congo",
            "dial_code": "+243",
            "code": "CD"
        },
        {
            "name": "Cook Islands",
            "dial_code": "+682",
            "code": "CK"
        },
        {
            "name": "Costa Rica",
            "dial_code": "+506",
            "code": "CR"
        },
        {
            "name": "Cote d'Ivoire",
            "dial_code": "+225",
            "code": "CI"
        },
        {
            "name": "Croatia",
            "dial_code": "+385",
            "code": "HR"
        },
        {
            "name": "Cuba",
            "dial_code": "+53",
            "code": "CU"
        },
        {
            "name": "Cyprus",
            "dial_code": "+357",
            "code": "CY"
        },
        {
            "name": "Czech Republic",
            "dial_code": "+420",
            "code": "CZ"
        },
        {
            "name": "Denmark",
            "dial_code": "+45",
            "code": "DK"
        },
        {
            "name": "Djibouti",
            "dial_code": "+253",
            "code": "DJ"
        },
        {
            "name": "Dominica",
            "dial_code": "+1767",
            "code": "DM"
        },
        {
            "name": "Dominican Republic",
            "dial_code": "+1849",
            "code": "DO"
        },
        {
            "name": "Ecuador",
            "dial_code": "+593",
            "code": "EC"
        },
        {
            "name": "Egypt",
            "dial_code": "+20",
            "code": "EG"
        },
        {
            "name": "El Salvador",
            "dial_code": "+503",
            "code": "SV"
        },
        {
            "name": "Equatorial Guinea",
            "dial_code": "+240",
            "code": "GQ"
        },
        {
            "name": "Eritrea",
            "dial_code": "+291",
            "code": "ER"
        },
        {
            "name": "Estonia",
            "dial_code": "+372",
            "code": "EE"
        },
        {
            "name": "Ethiopia",
            "dial_code": "+251",
            "code": "ET"
        },
        {
            "name": "Falkland Islands (Malvinas)",
            "dial_code": "+500",
            "code": "FK"
        },
        {
            "name": "Faroe Islands",
            "dial_code": "+298",
            "code": "FO"
        },
        {
            "name": "Fiji",
            "dial_code": "+679",
            "code": "FJ"
        },
        {
            "name": "Finland",
            "dial_code": "+358",
            "code": "FI"
        },
        {
            "name": "France",
            "dial_code": "+33",
            "code": "FR"
        },
        {
            "name": "French Guiana",
            "dial_code": "+594",
            "code": "GF"
        },
        {
            "name": "French Polynesia",
            "dial_code": "+689",
            "code": "PF"
        },
        {
            "name": "Gabon",
            "dial_code": "+241",
            "code": "GA"
        },
        {
            "name": "Gambia",
            "dial_code": "+220",
            "code": "GM"
        },
        {
            "name": "Georgia",
            "dial_code": "+995",
            "code": "GE"
        },
        {
            "name": "Germany",
            "dial_code": "+49",
            "code": "DE"
        },
        {
            "name": "Ghana",
            "dial_code": "+233",
            "code": "GH"
        },
        {
            "name": "Gibraltar",
            "dial_code": "+350",
            "code": "GI"
        },
        {
            "name": "Greece",
            "dial_code": "+30",
            "code": "GR"
        },
        {
            "name": "Greenland",
            "dial_code": "+299",
            "code": "GL"
        },
        {
            "name": "Grenada",
            "dial_code": "+1473",
            "code": "GD"
        },
        {
            "name": "Guadeloupe",
            "dial_code": "+590",
            "code": "GP"
        },
        {
            "name": "Guam",
            "dial_code": "+1671",
            "code": "GU"
        },
        {
            "name": "Guatemala",
            "dial_code": "+502",
            "code": "GT"
        },
        {
            "name": "Guernsey",
            "dial_code": "+44",
            "code": "GG"
        },
        {
            "name": "Guinea",
            "dial_code": "+224",
            "code": "GN"
        },
        {
            "name": "Guinea-Bissau",
            "dial_code": "+245",
            "code": "GW"
        },
        {
            "name": "Guyana",
            "dial_code": "+595",
            "code": "GY"
        },
        {
            "name": "Haiti",
            "dial_code": "+509",
            "code": "HT"
        },
        {
            "name": "Holy See (Vatican City State)",
            "dial_code": "+379",
            "code": "VA"
        },
        {
            "name": "Honduras",
            "dial_code": "+504",
            "code": "HN"
        },
        {
            "name": "Hong Kong",
            "dial_code": "+852",
            "code": "HK"
        },
        {
            "name": "Hungary",
            "dial_code": "+36",
            "code": "HU"
        },
        {
            "name": "Iceland",
            "dial_code": "+354",
            "code": "IS"
        },
        {
            "name": "India",
            "dial_code": "+91",
            "code": "IN"
        },
        {
            "name": "Indonesia",
            "dial_code": "+62",
            "code": "ID"
        },
        {
            "name": "Iran, Islamic Republic of Persian Gulf",
            "dial_code": "+98",
            "code": "IR"
        },
        {
            "name": "Iraq",
            "dial_code": "+964",
            "code": "IQ"
        },
        {
            "name": "Ireland",
            "dial_code": "+353",
            "code": "IE"
        },
        {
            "name": "Isle of Man",
            "dial_code": "+44",
            "code": "IM"
        },
        {
            "name": "Israel",
            "dial_code": "+972",
            "code": "IL"
        },
        {
            "name": "Italy",
            "dial_code": "+39",
            "code": "IT"
        },
        {
            "name": "Jamaica",
            "dial_code": "+1876",
            "code": "JM"
        },
        {
            "name": "Japan",
            "dial_code": "+81",
            "code": "JP"
        },
        {
            "name": "Jersey",
            "dial_code": "+44",
            "code": "JE"
        },
        {
            "name": "Jordan",
            "dial_code": "+962",
            "code": "JO"
        },
        {
            "name": "Kazakhstan",
            "dial_code": "+77",
            "code": "KZ"
        },
        {
            "name": "Kenya",
            "dial_code": "+254",
            "code": "KE"
        },
        {
            "name": "Kiribati",
            "dial_code": "+686",
            "code": "KI"
        },
        {
            "name": "Korea, Democratic People's Republic of Korea",
            "dial_code": "+850",
            "code": "KP"
        },
        {
            "name": "Korea, Republic of South Korea",
            "dial_code": "+82",
            "code": "KR"
        },
        {
            "name": "Kuwait",
            "dial_code": "+965",
            "code": "KW"
        },
        {
            "name": "Kyrgyzstan",
            "dial_code": "+996",
            "code": "KG"
        },
        {
            "name": "Laos",
            "dial_code": "+856",
            "code": "LA"
        },
        {
            "name": "Latvia",
            "dial_code": "+371",
            "code": "LV"
        },
        {
            "name": "Lebanon",
            "dial_code": "+961",
            "code": "LB"
        },
        {
            "name": "Lesotho",
            "dial_code": "+266",
            "code": "LS"
        },
        {
            "name": "Liberia",
            "dial_code": "+231",
            "code": "LR"
        },
        {
            "name": "Libyan Arab Jamahiriya",
            "dial_code": "+218",
            "code": "LY"
        },
        {
            "name": "Liechtenstein",
            "dial_code": "+423",
            "code": "LI"
        },
        {
            "name": "Lithuania",
            "dial_code": "+370",
            "code": "LT"
        },
        {
            "name": "Luxembourg",
            "dial_code": "+352",
            "code": "LU"
        },
        {
            "name": "Macao",
            "dial_code": "+853",
            "code": "MO"
        },
        {
            "name": "Macedonia",
            "dial_code": "+389",
            "code": "MK"
        },
        {
            "name": "Madagascar",
            "dial_code": "+261",
            "code": "MG"
        },
        {
            "name": "Malawi",
            "dial_code": "+265",
            "code": "MW"
        },
        {
            "name": "Malaysia",
            "dial_code": "+60",
            "code": "MY"
        },
        {
            "name": "Maldives",
            "dial_code": "+960",
            "code": "MV"
        },
        {
            "name": "Mali",
            "dial_code": "+223",
            "code": "ML"
        },
        {
            "name": "Malta",
            "dial_code": "+356",
            "code": "MT"
        },
        {
            "name": "Marshall Islands",
            "dial_code": "+692",
            "code": "MH"
        },
        {
            "name": "Martinique",
            "dial_code": "+596",
            "code": "MQ"
        },
        {
            "name": "Mauritania",
            "dial_code": "+222",
            "code": "MR"
        },
        {
            "name": "Mauritius",
            "dial_code": "+230",
            "code": "MU"
        },
        {
            "name": "Mayotte",
            "dial_code": "+262",
            "code": "YT"
        },
        {
            "name": "Mexico",
            "dial_code": "+52",
            "code": "MX"
        },
        {
            "name": "Micronesia, Federated States of Micronesia",
            "dial_code": "+691",
            "code": "FM"
        },
        {
            "name": "Moldova",
            "dial_code": "+373",
            "code": "MD"
        },
        {
            "name": "Monaco",
            "dial_code": "+377",
            "code": "MC"
        },
        {
            "name": "Mongolia",
            "dial_code": "+976",
            "code": "MN"
        },
        {
            "name": "Montenegro",
            "dial_code": "+382",
            "code": "ME"
        },
        {
            "name": "Montserrat",
            "dial_code": "+1664",
            "code": "MS"
        },
        {
            "name": "Morocco",
            "dial_code": "+212",
            "code": "MA"
        },
        {
            "name": "Mozambique",
            "dial_code": "+258",
            "code": "MZ"
        },
        {
            "name": "Myanmar",
            "dial_code": "+95",
            "code": "MM"
        },
        {
            "name": "Namibia",
            "dial_code": "+264",
            "code": "NA"
        },
        {
            "name": "Nauru",
            "dial_code": "+674",
            "code": "NR"
        },
        {
            "name": "Nepal",
            "dial_code": "+977",
            "code": "NP"
        },
        {
            "name": "Netherlands",
            "dial_code": "+31",
            "code": "NL"
        },
        {
            "name": "Netherlands Antilles",
            "dial_code": "+599",
            "code": "AN"
        },
        {
            "name": "New Caledonia",
            "dial_code": "+687",
            "code": "NC"
        },
        {
            "name": "New Zealand",
            "dial_code": "+64",
            "code": "NZ"
        },
        {
            "name": "Nicaragua",
            "dial_code": "+505",
            "code": "NI"
        },
        {
            "name": "Niger",
            "dial_code": "+227",
            "code": "NE"
        },
        {
            "name": "Nigeria",
            "dial_code": "+234",
            "code": "NG"
        },
        {
            "name": "Niue",
            "dial_code": "+683",
            "code": "NU"
        },
        {
            "name": "Norfolk Island",
            "dial_code": "+672",
            "code": "NF"
        },
        {
            "name": "Northern Mariana Islands",
            "dial_code": "+1670",
            "code": "MP"
        },
        {
            "name": "Norway",
            "dial_code": "+47",
            "code": "NO"
        },
        {
            "name": "Oman",
            "dial_code": "+968",
            "code": "OM"
        },
        {
            "name": "Pakistan",
            "dial_code": "+92",
            "code": "PK"
        },
        {
            "name": "Palau",
            "dial_code": "+680",
            "code": "PW"
        },
        {
            "name": "Palestinian Territory, Occupied",
            "dial_code": "+970",
            "code": "PS"
        },
        {
            "name": "Panama",
            "dial_code": "+507",
            "code": "PA"
        },
        {
            "name": "Papua New Guinea",
            "dial_code": "+675",
            "code": "PG"
        },
        {
            "name": "Paraguay",
            "dial_code": "+595",
            "code": "PY"
        },
        {
            "name": "Peru",
            "dial_code": "+51",
            "code": "PE"
        },
        {
            "name": "Philippines",
            "dial_code": "+63",
            "code": "PH"
        },
        {
            "name": "Pitcairn",
            "dial_code": "+872",
            "code": "PN"
        },
        {
            "name": "Poland",
            "dial_code": "+48",
            "code": "PL"
        },
        {
            "name": "Portugal",
            "dial_code": "+351",
            "code": "PT"
        },
        {
            "name": "Puerto Rico",
            "dial_code": "+1939",
            "code": "PR"
        },
        {
            "name": "Qatar",
            "dial_code": "+974",
            "code": "QA"
        },
        {
            "name": "Romania",
            "dial_code": "+40",
            "code": "RO"
        },
        {
            "name": "Russia",
            "dial_code": "+7",
            "code": "RU"
        },
        {
            "name": "Rwanda",
            "dial_code": "+250",
            "code": "RW"
        },
        {
            "name": "Reunion",
            "dial_code": "+262",
            "code": "RE"
        },
        {
            "name": "Saint Barthelemy",
            "dial_code": "+590",
            "code": "BL"
        },
        {
            "name": "Saint Helena, Ascension and Tristan Da Cunha",
            "dial_code": "+290",
            "code": "SH"
        },
        {
            "name": "Saint Kitts and Nevis",
            "dial_code": "+1869",
            "code": "KN"
        },
        {
            "name": "Saint Lucia",
            "dial_code": "+1758",
            "code": "LC"
        },
        {
            "name": "Saint Martin",
            "dial_code": "+590",
            "code": "MF"
        },
        {
            "name": "Saint Pierre and Miquelon",
            "dial_code": "+508",
            "code": "PM"
        },
        {
            "name": "Saint Vincent and the Grenadines",
            "dial_code": "+1784",
            "code": "VC"
        },
        {
            "name": "Samoa",
            "dial_code": "+685",
            "code": "WS"
        },
        {
            "name": "San Marino",
            "dial_code": "+378",
            "code": "SM"
        },
        {
            "name": "Sao Tome and Principe",
            "dial_code": "+239",
            "code": "ST"
        },
        {
            "name": "Saudi Arabia",
            "dial_code": "+966",
            "code": "SA"
        },
        {
            "name": "Senegal",
            "dial_code": "+221",
            "code": "SN"
        },
        {
            "name": "Serbia",
            "dial_code": "+381",
            "code": "RS"
        },
        {
            "name": "Seychelles",
            "dial_code": "+248",
            "code": "SC"
        },
        {
            "name": "Sierra Leone",
            "dial_code": "+232",
            "code": "SL"
        },
        {
            "name": "Singapore",
            "dial_code": "+65",
            "code": "SG"
        },
        {
            "name": "Slovakia",
            "dial_code": "+421",
            "code": "SK"
        },
        {
            "name": "Slovenia",
            "dial_code": "+386",
            "code": "SI"
        },
        {
            "name": "Solomon Islands",
            "dial_code": "+677",
            "code": "SB"
        },
        {
            "name": "Somalia",
            "dial_code": "+252",
            "code": "SO"
        },
        {
            "name": "South Africa",
            "dial_code": "+27",
            "code": "ZA"
        },
        {
            "name": "South Sudan",
            "dial_code": "+211",
            "code": "SS"
        },
        {
            "name": "South Georgia and the South Sandwich Islands",
            "dial_code": "+500",
            "code": "GS"
        },
        {
            "name": "Spain",
            "dial_code": "+34",
            "code": "ES"
        },
        {
            "name": "Sri Lanka",
            "dial_code": "+94",
            "code": "LK"
        },
        {
            "name": "Sudan",
            "dial_code": "+249",
            "code": "SD"
        },
        {
            "name": "Suriname",
            "dial_code": "+597",
            "code": "SR"
        },
        {
            "name": "Svalbard and Jan Mayen",
            "dial_code": "+47",
            "code": "SJ"
        },
        {
            "name": "Swaziland",
            "dial_code": "+268",
            "code": "SZ"
        },
        {
            "name": "Sweden",
            "dial_code": "+46",
            "code": "SE"
        },
        {
            "name": "Switzerland",
            "dial_code": "+41",
            "code": "CH"
        },
        {
            "name": "Syrian Arab Republic",
            "dial_code": "+963",
            "code": "SY"
        },
        {
            "name": "Taiwan",
            "dial_code": "+886",
            "code": "TW"
        },
        {
            "name": "Tajikistan",
            "dial_code": "+992",
            "code": "TJ"
        },
        {
            "name": "Tanzania, United Republic of Tanzania",
            "dial_code": "+255",
            "code": "TZ"
        },
        {
            "name": "Thailand",
            "dial_code": "+66",
            "code": "TH"
        },
        {
            "name": "Timor-Leste",
            "dial_code": "+670",
            "code": "TL"
        },
        {
            "name": "Togo",
            "dial_code": "+228",
            "code": "TG"
        },
        {
            "name": "Tokelau",
            "dial_code": "+690",
            "code": "TK"
        },
        {
            "name": "Tonga",
            "dial_code": "+676",
            "code": "TO"
        },
        {
            "name": "Trinidad and Tobago",
            "dial_code": "+1868",
            "code": "TT"
        },
        {
            "name": "Tunisia",
            "dial_code": "+216",
            "code": "TN"
        },
        {
            "name": "Turkey",
            "dial_code": "+90",
            "code": "TR"
        },
        {
            "name": "Turkmenistan",
            "dial_code": "+993",
            "code": "TM"
        },
        {
            "name": "Turks and Caicos Islands",
            "dial_code": "+1649",
            "code": "TC"
        },
        {
            "name": "Tuvalu",
            "dial_code": "+688",
            "code": "TV"
        },
        {
            "name": "Uganda",
            "dial_code": "+256",
            "code": "UG"
        },
        {
            "name": "Ukraine",
            "dial_code": "+380",
            "code": "UA"
        },
        {
            "name": "United Arab Emirates",
            "dial_code": "+971",
            "code": "AE"
        },
        {
            "name": "United Kingdom",
            "dial_code": "+44",
            "code": "GB"
        },
        {
            "name": "United States",
            "dial_code": "+1",
            "code": "US"
        },
        {
            "name": "Uruguay",
            "dial_code": "+598",
            "code": "UY"
        },
        {
            "name": "Uzbekistan",
            "dial_code": "+998",
            "code": "UZ"
        },
        {
            "name": "Vanuatu",
            "dial_code": "+678",
            "code": "VU"
        },
        {
            "name": "Venezuela, Bolivarian Republic of Venezuela",
            "dial_code": "+58",
            "code": "VE"
        },
        {
            "name": "Vietnam",
            "dial_code": "+84",
            "code": "VN"
        },
        {
            "name": "Virgin Islands, British",
            "dial_code": "+1284",
            "code": "VG"
        },
        {
            "name": "Virgin Islands, U.S.",
            "dial_code": "+1340",
            "code": "VI"
        },
        {
            "name": "Wallis and Futuna",
            "dial_code": "+681",
            "code": "WF"
        },
        {
            "name": "Yemen",
            "dial_code": "+967",
            "code": "YE"
        },
        {
            "name": "Zambia",
            "dial_code": "+260",
            "code": "ZM"
        },
        {
            "name": "Zimbabwe",
            "dial_code": "+263",
            "code": "ZW"
        }
    ];
    return (
        loading ? <div className="w-full"><Loading /> </div> :
            <div className='w-full form' style={language === 'ar' ? { direction: 'rtl' } : { direction: 'ltr' }}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(Submit)} >
                        <div >
                            <FormField
                                control={form.control}
                                name="nameLabel"
                                className='w-full'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <FormLabel>{language === 'ar' ? 'الاسم' : 'Name'}</FormLabel>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div >
                            <FormField
                                control={form.control}
                                name="name"
                                className='w-full'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="EX: mohamed yaocub"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='form-message' />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div >
                            <FormField
                                control={form.control}
                                name="whatsapp"
                                className='w-full'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <FormLabel>{language === 'ar' ? 'رقم الواتساب' : 'whatsapp number'}</FormLabel>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div >
                            <FormField
                                className="w-full ltr"
                                style={{ direction: 'ltr' }}
                                control={form.control}
                                name="phone" // Field for phone number
                                render={({ field }) => (
                                    <FormItem className={`w-full `}>
                                        <FormControl className=''>
                                            <PhnoeInput initialValueFormat="national"
                                                international
                                                countryCallingCodeEditable={false}
                                                defaultCountry="SA" // Setting the default country to Egypt
                                                className="" onChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage className='form-message' /> {/* Displaying validation messages */}
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div >
                            <FormField
                                control={form.control}
                                name="whatsapp"
                                className='w-full'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <FormLabel>{language === 'ar' ? 'الوجهة' : 'Destniation'}</FormLabel>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div >
                            <FormField
                                control={form.control}
                                name="destniation"
                                render={({ field }) => (
                                    <FormItem >
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl className="date-picker">
                                                <SelectTrigger className="w-full">
                                                    <FormLabel className="date-btn">
                                                        <SelectValue placeholder="Destniation" />
                                                    </FormLabel>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {data?.data.packages.map((packageItem, index) => (
                                                        <SelectItem value={`${packageItem.id}-${packageItem.name}`} key={index}>{packageItem.name}</SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className='form-message' />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div >
                            <FormField
                                control={form.control}
                                name="whatsapp"
                                className='w-full'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <FormLabel>{language === 'ar' ? 'تاريخ الوصول' : 'Arrive date'}</FormLabel>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div >
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className=" date-picker">
                                        <Select defaultValue={field.value}>
                                            <FormControl>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full justify-start text-left font-normal shadow-none ",
                                                                !date && "text-muted-foreground"
                                                            )}
                                                        >
                                                            <CalendarIcon />
                                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={date}
                                                            onSelect={setDate}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </FormControl>
                                            <SelectContent >

                                            </SelectContent>
                                        </Select>
                                        <FormMessage className='form-message' />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='captcha'>
                            <ReCAPTCHA sitekey="6Lc3A4oqAAAAALKG0Ww3vyaaIdmMWIAjXIi6xvoa" onChange={onChange} />
                            <p className={`${!captchaa && visited ? 'block' : 'hidden'} captcha-text`}>Please verify that you are not a robot</p>
                        </div>
                        <Button type="submit" className='text-xl py-4 rounded-xl min-w-32 h-13 submit '>Submit</Button>
                    </form>
                </Form>
            </div>
    );
}
