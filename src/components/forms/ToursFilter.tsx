"use client";

import { SyntheticEvent, useState, useRef } from "react";

import StyledRadioButton from "../controls/styledRadioButton";
import StyledCheckboxButton from "../controls/styledCheckboxButton";

import { useLoader } from "@/context/LoaderContext";

import { filterToursByRegion } from "@/utils/tourFilterUtils";

// import { ActivityDTO } from "@/interfaces/ActivityDTO";
import { RegionBaseDTO } from "@/interfaces/RegionDTO";

import { TourDTO, TourUI } from "@/interfaces/TourDTO";
import TourCard from "../cards/tour-card/tour-card";

export default function ToursFilter({
  locale,
  regionNames,
  activities,
  initialTours,
  getToursByFilter,
}: {
  locale: string;
  regionNames: RegionBaseDTO[];
  activities: {
    id: string;
    en: string;
    bg: string;
}[];
  initialTours: TourUI[];
  getToursByFilter: (filters: any) => Promise<TourUI[] | null>;
}) {

  const { isLoading, startNavigation } = useLoader();
  const [ tours, setTours ] = useState<TourUI[]>(initialTours);
  const [formData, setFormData] = useState({
    durationFilter: "",
    activityFilter: [] as string[],
    regionFilter: [] as string[],
  });

  const filteredToursRef = useRef<HTMLDivElement>(null);

  const durationFilterGroup = {
    id: "durationFilter",
    label: locale == "bg" ? "Продължителност (дни)" : "Duration (days)",
    options: ["1", "2", "3-7", "8-14", "15+"]
  };

  const activityFilterGroup = {
    id: "activityFilter",
    label: locale == "bg" ? "Активност" : "Activity",
    options: activities,
  };

  const regionFilterGroup = {
    id: "regionFilter",
    label: locale == "bg" ? "Регион" : "Region",
    options: regionNames,
  };

  const handleRadioChange = (id: string, value: string) => {
    setFormData((prevData) => {
      console.log(value)
      if (prevData.durationFilter === value) return { ...prevData, [id]: ""}
      return { ...prevData, [id]: value }
    });
  };

  const handleCheckboxChange = (
    id: string,
    value: string,
    checked: boolean,
  ) => {
    setFormData((prevData) => {
      if (checked && id === "activityFilter" && formData.activityFilter.length > 10) {
        formData.activityFilter.shift(); // Remove the first (oldest) activity if more than 10 are selected
      }
      const updatedValues = checked
        ? [...prevData[id], value]
        : prevData[id].filter((item) => item !== value);
      return { ...prevData, [id]: updatedValues };
    });
  };

  const handleCheckboxReset = (id: string) => {
    setFormData((prevData) => ({ ...prevData, [id]: [] }));
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    // filteredToursRef.current?.scrollIntoView({behavior: "smooth"})
    startNavigation( async () => {
      
      const { activityFilter, regionFilter, durationFilter } = formData;
      
      window.scrollTo({ top: 0, behavior: 'smooth' }); // 'smooth' for a nice glide, 'instant' for a jump
      
      if (activityFilter.length === 0 && durationFilter === "" && regionFilter.length > 0) {
        setTours(filterToursByRegion(initialTours, regionFilter));
        
        return;
      }
      
      const filteredTours = await getToursByFilter({ activityFilter, durationFilter });
      const filteredToursByRegion = filterToursByRegion(filteredTours || [], regionFilter);
      setTours(filteredToursByRegion);
    });
  };

  return (
    <>
      <div className="p-4 xl:flex xl:gap-6" ref={filteredToursRef} id='filteredTours'>

        {tours.length > 0 ?
          
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 2xl:grid-cols-3 mt-8" ref={filteredToursRef} id='filteredTours'>
            {tours.map( tour => (<TourCard key={tour.id} tour={tour} locale={locale}/>))}
          </div>

          :
          
          <div className="mt-4 text-center text-lg font-medium">
            {isLoading ? (locale == "bg" ? "Един момент ..." : "Loading ...") : (locale == "bg" ? "Няма намерени турове с тези критерии." : "No tours found with these criteria.")}
          </div>
        }
        <form onSubmit={handleSubmit} className="space-y-4 mt-8 xl:mt-14 xl:shrink-12 2xl:shrink-6">
          <div>

            <label className="mb-2 block font-medium">
              {durationFilterGroup.label}
            </label>
            <div className="flex flex-wrap gap-1">
              {durationFilterGroup.options.map((option) => (
                <StyledRadioButton
                  key={option}
                  name={durationFilterGroup.id}
                  value={option}
                  checked={formData[durationFilterGroup.id] === option}
                  onChange={(value) =>
                    handleRadioChange(durationFilterGroup.id, value)
                  }
                  label={option}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              {activityFilterGroup.label}
            </label>
            <div className="flex flex-wrap gap-1">
              {activityFilterGroup.options.map((activity) => (
                <StyledCheckboxButton
                  key={activity.id}
                  value={activity.id}
                  checked={formData[activityFilterGroup.id].includes(activity.id)}
                  onChange={(value) =>
                    handleCheckboxChange(
                      activityFilterGroup.id,
                      value,
                      !formData[activityFilterGroup.id].includes(value),
                    )
                  }
                  label={activity[locale]}
                />
              ))}
              <StyledCheckboxButton
                value={"Reset"}
                checked={formData[activityFilterGroup.id].length === 0}
                onChange={() => handleCheckboxReset(activityFilterGroup.id)}
                label={locale == "bg" ? "Всички" : "All"}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              {regionFilterGroup.label}
            </label>
            <div className="flex flex-wrap gap-1">
              {regionFilterGroup.options.map((regionName) => (
                <StyledCheckboxButton
                  key={regionName.id}
                  value={regionName.id}
                  checked={formData[regionFilterGroup.id].includes(regionName.id)}
                  onChange={(value) =>
                    handleCheckboxChange(
                      regionFilterGroup.id,
                      value,
                      !formData[regionFilterGroup.id].includes(value),
                    )
                  }
                  label={regionName.header[locale]}
                />
              ))}
              <StyledCheckboxButton
                value={"Reset"}
                checked={formData[regionFilterGroup.id].length === 0}
                onChange={() => handleCheckboxReset(regionFilterGroup.id)}
                label={locale == "bg" ? "Всички" : "All"}
              />
            </div>
          </div>

          <button
            type="submit"
            className="hover:bg-accent-500 bg-accent-100 text-base-900 h-12 w-30 cursor-pointer rounded-full p-2 transition-all"
          >
            {locale == "bg" ? "Филтър" : "Filter"}
          </button>

        </form>

      </div>
    </>
  );
}

