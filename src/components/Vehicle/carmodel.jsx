import { motion } from "framer-motion";

export const CAR_MODELS = {
  TOYOTA: [
    {
      id: "CAMRY",
      name: "Camry",
      year_range: "1998-2024",
      image:
        "https://imgd.aeplcdn.com/664x374/n/cw/ec/110233/camry-exterior-right-front-three-quarter-3.jpeg",
    },
    {
      id: "COROLLA",
      name: "Corolla",
      year_range: "1995-2024",
      image:
        "https://s1.paultan.org/image/2019/09/2019-Toyota-Corolla-Japan-market-launch-2.jpg",
    },
    {
      id: "INNOVA",
      name: "Innova",
      year_range: "2005-2024",
      image:
        "https://img.philkotse.com/2023/07/10/WFFKkBCT/zenix-1-2ee1_wm.png",
    },
    {
      id: "FORTUNER",
      name: "Fortuner",
      year_range: "2009-2024",
      image:
        "https://imgd.aeplcdn.com/1200x900/n/cw/ec/44709/fortuner-exterior-right-front-three-quarter-19.jpeg",
    },
    {
      id: "LAND_CRUISER",
      name: "Land Cruiser",
      year_range: "2008-2024",
      image:
        "https://cdn.motor1.com/images/mgl/VA02z/s1/next-gen-toyota-land-cruiser-renderings.jpg",
    },
  ],
  HONDA: [
    {
      id: "CITY",
      name: "City",
      year_range: "1998-2024",
      image:
        "https://danviet.mediacdn.vn/296231569849192448/2023/8/21/gia-xe-honda-city-danvietvn2-16925838977231385304634.jpg",
    },
    {
      id: "CIVIC",
      name: "Civic",
      year_range: "1995-2024",
      image:
        "https://hips.hearstapps.com/hmg-prod/images/2022-honda-civic-hatchback-sport-touring-309-1634066512.jpg?crop=0.554xw:0.415xh;0.327xw,0.525xh&resize=1200:*",
    },
    {
      id: "AMAZE",
      name: "Amaze",
      year_range: "2013-2024",
      image:
        "https://th.bing.com/th/id/R.3d8ef5a2bde1fe0cba89f5d0325b24fa?rik=half6cWvUtu%2bSw&riu=http%3a%2f%2fimages.topgear.com.ph%2ftopgear%2fimages%2f2024%2f12%2f04%2fhonda-amaze-2025-1-1733301975.webp&ehk=ZaikDskhSfTmPIrW25jQp3IoO8kNNLgTQphbepnggk4%3d&risl=&pid=ImgRaw&r=0",
    },
    {
      id: "CRV",
      name: "CR-V",
      year_range: "2001-2024",
      image: "https://images.hgmsites.net/hug/2018-honda-cr-v_100626779_h.jpg",
    },
    {
      id: "HRV",
      name: "HR-V",
      year_range: "2021-2024",
      image:
        "https://escolaeducacao.com.br/wp-content/uploads/2023/05/honda-hr-v-touring-2023.webp",
    },
  ],
  HYUNDAI: [
    {
      id: "CRETA",
      name: "Creta",
      year_range: "2015-2024",
      image:
        "https://www.cartoq.com/wp-content/uploads/2024/01/2024-Hyundai-Creta-facelift-full-render.jpg",
    },
    {
      id: "VERNA",
      name: "Verna",
      year_range: "2006-2024",
      image:
        "https://automotive.boseindia.com/sites/default/files/IN_Verna_Exterior_Hero.jpg",
    },
    {
      id: "I20",
      name: "i20",
      year_range: "2008-2024",
      image:
        "https://imgd.aeplcdn.com/1200x900/n/cw/ec/40530/i20-exterior-right-front-three-quarter-5.jpeg",
    },
    {
      id: "VENUE",
      name: "Venue",
      year_range: "2019-2024",
      image:
        "https://www.carscoops.com/wp-content/uploads/2019/04/efdb5dea-2020-hyundai-venue-0.jpg",
    },
    {
      id: "SONATA",
      name: "Sonata",
      year_range: "1985-2024",
      image:
        "https://4.bp.blogspot.com/-UzkSvb8tE2c/WUFrfFAP81I/AAAAAAAA2Qo/GHOc5-_wH9M-6HBsA9u_9xqbaAS10fQeACLcBGAs/s1600/2018-Hyundai-Sonata-04.jpg",
    },
  ],
  MAHINDRA: [
    {
      id: "THAR",
      name: "Thar",
      year_range: "2010-2024",
      image:
        "https://imgd.aeplcdn.com/1200x900/n/cw/ec/40087/thar-exterior-right-front-three-quarter-11.jpeg",
    },
    {
      id: "XUV700",
      name: "XUV700",
      year_range: "2021-2024",
      image:
        "https://imgd.aeplcdn.com/1200x900/n/cw/ec/42355/xuv700-exterior-right-front-three-quarter.jpeg",
    },
    {
      id: "SCORPIO",
      name: "Scorpio",
      year_range: "2002-2024",
      image:
        "https://imgd.aeplcdn.com/1200x900/n/cw/ec/40432/scorpio-n-exterior-right-front-three-quarter-15.jpeg",
    },
    {
      id: "XUV300",
      name: "XUV300",
      year_range: "2019-2024",
      image:
        "https://imgd.aeplcdn.com/1200x900/n/cw/ec/26918/xuv300-exterior-right-front-three-quarter-148709.jpeg",
    },
    {
      id: "ALTURAS",
      name: "Alturas",
      year_range: "2018-2024",
      image:
        "https://stat.overdrive.in/wp-content/odgallery/2018/11/48596_Mahindra_Alturas_G4_2019_023.jpg",
    },
  ],
  FORD: [
    {
      id: "MUSTANG",
      name: "Mustang",
      year_range: "1965-2024",
      image:
        "https://th.bing.com/th/id/OIP.682THEpheKRu74atngM1nAHaE1?rs=1&pid=ImgDetMain",
    },
    {
      id: "F150",
      name: "F-150",
      year_range: "1948-2024",
      image:
        "https://cdn.motor1.com/images/mgl/gm9Ow/s1/lanzamiento-ford-f-150-lariat.jpg",
    },
    {
      id: "RANGER",
      name: "Ranger",
      year_range: "1983-2024",
      image:
        "https://images.carexpert.com.au/resize/3000/-/app/uploads/2023/03/2024-Ford-Ranger-Wildtrak-X-7.jpg",
    },
    {
      id: "ECOSPORT",
      name: "EcoSport",
      year_range: "2003-2024",
      image:
        "https://sf1.autojournal.fr/wp-content/uploads/autojournal/2020/11/Ford_EcoSport_2017_67995.jpg",
    },
  ],

  BMW: [
    {
      id: "X5",
      name: "X5",
      year_range: "1999-2024",
      image:
        "https://th.bing.com/th/id/OIP.Ta0DCsT2Qpq-zUZWq9QSSAHaFj?rs=1&pid=ImgDetMain",
    },
    {
      id: "SERIES_3",
      name: "3 Series",
      year_range: "1975-2024",
      image:
        "https://www.motorbiscuit.com/wp-content/uploads/2022/08/Front-angle-view-of-new-grey-fully-loaded-2023-BMW-3-Series.jpg",
    },
    {
      id: "SERIES_5",
      name: "5 Series",
      year_range: "1972-2024",
      image:
        "https://paultan.org/image/2023/08/2024-BMW-5-Series-i5-for-China-1.jpg",
    },
    {
      id: "X3",
      name: "X3",
      year_range: "2003-2024",
      image: "https://cdn.motor1.com/images/mgl/rMz4r/s1/bmw-x3-2021.jpg",
    },
  ],

  MERCEDES: [
    {
      id: "C_CLASS",
      name: "C-Class",
      year_range: "1993-2024",
      image:
        "https://assets-eu-01.kc-usercontent.com/3b3d460e-c5ae-0195-6b86-3ac7fb9d52db/2afe2a29-cd25-410c-9a55-c2d17ddcea57/Mercedes-C-Class-2021-2.jpg?width=800&fm=jpg&auto=format",
    },
    {
      id: "E_CLASS",
      name: "E-Class",
      year_range: "1993-2024",
      image:
        "https://th.bing.com/th/id/OIP.csRyrOy4c0OfRnpTj8uj5wHaE8?rs=1&pid=ImgDetMain",
    },
    {
      id: "GLA",
      name: "GLA",
      year_range: "2014-2024",
      image:
        "https://www.autocar.co.uk/sites/autocar.co.uk/files/images/car-reviews/first-drives/legacy/1-mercedes-amg-gla-45-2020-uk-fd-hero-front.jpg",
    },
    {
      id: "GLC",
      name: "GLC",
      year_range: "2015-2024",
      image:
        "https://s3.caradvice.com.au/wp-content/uploads/2016/11/2017-mercedes-benz-glc-7.jpg",
    },
  ],
  // Add this section alongside your other car manufacturer arrays
  TATA: [
    {
      id: "NEXON",
      name: "Nexon",
      year_range: "2017-2024",
      image:
        "https://st1.techlusive.in/wp-content/uploads/2023/09/nexon-cover.jpg",
    },
    {
      id: "HARRIER",
      name: "Harrier",
      year_range: "2019-2024",
      image:
        "https://cdni.autocarindia.com/ExtraImages/20231006071216_tata_harrier_facelift_fearless.jpg",
    },
    {
      id: "SAFARI",
      name: "Safari",
      year_range: "1998-2024",
      image:
        "https://assets.mspimages.in/gear/wp-content/uploads/2022/06/Tata-Safari-EV.jpg",
    },
    {
      id: "PUNCH",
      name: "Punch",
      year_range: "2021-2024",
      image:
        "https://imgd.aeplcdn.com/1200x900/n/cw/ec/39015/punch-exterior-right-front-three-quarter-54.jpeg",
    },
    {
      id: "ALTROZ",
      name: "Altroz",
      year_range: "2020-2024",
      image:
        "https://media.zigcdn.com/media/model/2023/Mar/front-1-4-left-1342689111_930x620.jpg",
    },
  ],

  AUDI: [
    {
      id: "A4",
      name: "A4",
      year_range: "1994-2024",
      image:
        "https://images.lifestyleasia.com/wp-content/uploads/sites/7/2021/02/09014228/2021-Audi-A4-Front-scaled-1.jpg",
    },
    {
      id: "Q5",
      name: "Q5",
      year_range: "2008-2024",
      image:
        "https://th.bing.com/th/id/R.b4ee256cfe40569ea4e22e578ba88cb8?rik=mqL6SWslV%2b4gLQ&riu=http%3a%2f%2fperformancedrive.com.au%2fwp-content%2fuploads%2f2016%2f09%2f2017-Audi-Q5-1.jpg&ehk=daQoaNX%2fX0zY72gpNXzfLU%2b4Ain9Jg70aTnVjecAJlQ%3d&risl=&pid=ImgRaw&r=0",
    },
    {
      id: "A6",
      name: "A6",
      year_range: "1994-2024",
      image: "https://carwow-uk-wp-3.imgix.net/A6-Avant-driving-front-2.jpg",
    },
    {
      id: "Q7",
      name: "Q7",
      year_range: "2005-2024",
      image:
        "https://s1.cdn.autoevolution.com/images/news/2017-audi-q7-now-available-with-20-liter-turbo-making-252-hp-112257_1.jpg",
    },
  ],

  VOLKSWAGEN: [
    {
      id: "POLO",
      name: "Polo",
      year_range: "1975-2024",
      image:
        "https://th.bing.com/th/id/OIP.6YpG2WIc_Cka3MIus4VXZQHaEo?rs=1&pid=ImgDetMain",
    },
    {
      id: "TIGUAN",
      name: "Tiguan",
      year_range: "2007-2024",
      image:
        "https://static1.topspeedimages.com/wordpress/wp-content/uploads/2023/01/resize_large-14971-2022tiguan.jpg",
    },
    {
      id: "VIRTUS",
      name: "Virtus",
      year_range: "2022-2024",
      image:
        "https://th.bing.com/th/id/OIP.nzGHglQmC5YC7X4H7JtXFAHaE1?rs=1&pid=ImgDetMain",
    },
    {
      id: "TAIGUN",
      name: "Taigun",
      year_range: "2021-2024",
      image:
        "https://cdni.autocarindia.com/ExtraImages/20210323101141_VW_Taigun_t_cross.jpg",
    },
  ],
  // Add this section before the final closing bracket of CAR_MODELS
  SKODA: [
    {
      id: "KUSHAQ",
      name: "Kushaq",
      year_range: "2021-2024",
      image:
        "https://www.financialexpress.com/wp-content/uploads/2022/04/Skoda-Kushaq.jpg",
    },
    {
      id: "SLAVIA",
      name: "Slavia",
      year_range: "2022-2024",
      image:
        "https://www.thedrivershub.com/wp-content/uploads/2022/05/slavia_1-edited-scaled.jpg",
    },
    {
      id: "OCTAVIA",
      name: "Octavia",
      year_range: "2001-2024",
      image:
        "https://th.bing.com/th/id/OIP.N5hejoXS_c0_DEypmNdr2QHaEK?rs=1&pid=ImgDetMain",
    },
    {
      id: "SUPERB",
      name: "Superb",
      year_range: "2004-2024",
      image:
        "https://stat.overdrive.in/wp-content/odgallery/2021/01/58241_2021_Skoda_superb_1.jpg",
    },
    {
      id: "KODIAQ",
      name: "Kodiaq",
      year_range: "2017-2024",
      image:
        "https://th.bing.com/th/id/R.919a2a82e0c6e6a374e1271dd9bb4c6e?rik=Ul%2bILJIbh38RHA&riu=http%3a%2f%2fimages.cdn.autocar.co.uk%2fsites%2fautocar.co.uk%2ffiles%2fimages%2fcar-reviews%2ffirst-drives%2flegacy%2fskoda-kodiac-web-001.jpg&ehk=DFnwp2pjklBrF6NkKdAGfqUnJPOdhTUQKU%2bbgCs1Wss%3d&risl=&pid=ImgRaw&r=0",
    },
  ],
  NISSAN: [
    {
      id: "MAGNITE",
      name: "Magnite",
      year_range: "2020-2024",
      image:
        "https://motoringworld.in/wp-content/uploads/2020/07/Magnite-Front-Copy-1.jpg",
    },
    {
      id: "KICKS",
      name: "Kicks",
      year_range: "2019-2024",
      image:
        "https://th.bing.com/th/id/OIP.bpoVtqR1Au04ZEbcVIDjAQHaEK?rs=1&pid=ImgDetMain",
    },
    {
      id: "XTRAIL",
      name: "X-Trail",
      year_range: "2001-2024",
      image:
        "https://th.bing.com/th/id/OIP.vwr0TmlNpR5pONp2N7KFZwHaE8?rs=1&pid=ImgDetMain",
    },
    {
      id: "PATROL",
      name: "Patrol",
      year_range: "1951-2024",
      image:
        "https://ymimg1.b8cdn.com/resized/article/8786/pictures/10398889/listing_main_Nissan_introduces_new_2023_Nissan_Patrol_in_the_Middle_East__1_.jpg",
    },
  ],
  // Add these sections before the final closing bracket of CAR_MODELS
  KIA: [
    {
      id: "SELTOS",
      name: "Seltos",
      year_range: "2019-2024",
      image:
        "https://imgd.aeplcdn.com/1200x900/n/cw/ec/141383/seltos-exterior-right-front-three-quarter-2.jpeg",
    },
    {
      id: "SONET",
      name: "Sonet",
      year_range: "2020-2024",
      image:
        "https://imgd.aeplcdn.com/1200x900/n/cw/ec/141115/sonet-exterior-right-front-three-quarter-5.jpeg",
    },
    {
      id: "CARENS",
      name: "Carens",
      year_range: "2022-2024",
      image:
        "https://imgd.aeplcdn.com/1200x900/n/cw/ec/144163/carens-exterior-right-front-three-quarter.jpeg",
    },
    {
      id: "EV6",
      name: "EV6",
      year_range: "2022-2024",
      image:
        "https://imgd.aeplcdn.com/1200x900/n/cw/ec/114451/ev6-exterior-right-front-three-quarter-3.jpeg",
    },
    {
      id: "CARNIVAL",
      name: "Carnival",
      year_range: "2020-2024",
      image:
        "https://imgd.aeplcdn.com/1200x900/n/cw/ec/41205/carnival-exterior-right-front-three-quarter-55.jpeg",
    },
  ],

  MARUTI_SUZUKI: [
    {
      id: "SWIFT",
      name: "Swift",
      year_range: "2005-2024",
      image:
        "https://www.autocar.co.uk/sites/autocar.co.uk/files/images/car-reviews/first-drives/legacy/swift_facelift_01.jpg",
    },
    {
      id: "BALENO",
      name: "Baleno",
      year_range: "2015-2024",
      image:
        "https://th.bing.com/th/id/OIP.QaTLPU9zgVVs0o3N_Pt6fwHaE8?rs=1&pid=ImgDetMain",
    },
    {
      id: "BREZZA",
      name: "Brezza",
      year_range: "2016-2024",
      image:
        "https://stat.overdrive.in/wp-content/odgallery/2018/08/46345_Maruti_Suzuki_Vitara_Breeza_036.jpg",
    },
    {
      id: "GRAND_VITARA",
      name: "Grand Vitara",
      year_range: "2022-2024",
      image:
        "https://www.autovista.in/assets/product_images/grand_vitara_web.jpeg",
    },
    {
      id: "DZIRE",
      name: "Dzire",
      year_range: "2008-2024",
      image:
        "https://imgd.aeplcdn.com/1200x900/n/cw/ec/45691/dzire-exterior-right-front-three-quarter-3.jpeg",
    },
    {
      id: "ERTIGA",
      name: "Ertiga",
      year_range: "2012-2024",
      image:
        "https://imgd.aeplcdn.com/1200x900/n/cw/ec/115777/ertiga-exterior-right-front-three-quarter-5.jpeg",
    },
  ],
};

export function CarModel({ formData, updateFields }) {
  const availableModels = CAR_MODELS[formData.make] || [];

  return (
    <div className="space-y-8">
      <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 mb-12">
        {formData.make
          ? `Select your ${formData.make} model`
          : "Select a vehicle model"}
      </h3>

      {formData.make ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {availableModels.map((model) => (
            <motion.button
              key={model.id}
              type="button"
              whileHover={{
                scale: 1.03,
                boxShadow:
                  "0 25px 35px -5px rgba(0, 0, 0, 0.2), 0 15px 15px -5px rgba(0, 0, 0, 0.15)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => updateFields({ model: model.id })}
              className={`relative overflow-hidden rounded-3xl transition-all duration-300 w-full ${
                formData.model === model.id
                  ? "ring-4 ring-blue-500 ring-offset-4 dark:ring-offset-gray-800"
                  : "hover:ring-2 hover:ring-blue-200"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 z-10" />
              <div className="h-64 w-full relative">
                <img
                  src={model.image}
                  alt={model.name}
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    formData.model === model.id
                      ? "scale-110"
                      : "hover:scale-105"
                  }`}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <div className="text-2xl font-bold text-white mb-2">
                    {model.name}
                  </div>
                  <div className="text-base text-gray-200">
                    Year Range: {model.year_range}
                  </div>
                </div>
              </div>
              {formData.model === model.id && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-6 right-6 bg-blue-500 text-white p-3 rounded-full z-20 shadow-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-xl text-gray-500 dark:text-gray-400">
            Please select a vehicle make first
          </div>
        </div>
      )}
    </div>
  );
}
