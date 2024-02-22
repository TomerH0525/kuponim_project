import "./Home.css";
import CouponCard from "./CouponCard/CouponCards";
import {
  Box,
  Menu,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Category from "../../Models/Category";
import Coupon from "../../Models/Coupon";
import publicSerivce from "../../Services/PublicService";
import { useForm } from "react-hook-form";
import { getValue } from "@testing-library/user-event/dist/utils";
import { couponsFormatState, couponsStore } from "../../Redux/CouponsStore";
import { authStore } from "../../Redux/AuthStore";
import { customerStore } from "../../Redux/CustomerStore";

interface allFilters {
  price: number;
  category: Category | number;
  title: string;
}

function Home(): JSX.Element {
  const [coupons, setCoupons] = useState<Coupon[]>(
    couponsStore.getState().coupons
  );

  const [filters, setFilters] = useState<allFilters>({
    price: 0,
    category: -1,
    title: "",
  });

  const [filteredCoupons, setFilteredCoupons] = useState<Coupon[]>([]);

  const [searchTerm, setSearchTerm] = useState("");

  const priceTimeoutId = useRef<NodeJS.Timeout | null>(null);
  const categoryTimeoutId = useRef<NodeJS.Timeout | null>(null);
  const titleTimeoutId = useRef<NodeJS.Timeout | null>(null);

  let filteringCoupons: Coupon[];

  const filterCoupons = (filters: allFilters) => {
    filteringCoupons = coupons;
    if (
      filters.price > 0 ||
      filters.category > -1 ||
      filters.title.length > 0
    ) {
      if (filters.price > 0) {
        console.log(filters.price);

        filteringCoupons = filteringCoupons.filter(
          (coupon) => filters.price >= coupon.price
        );
      }

      if (filters.category > -1) {
        console.log(filters.category);
        filteringCoupons = filteringCoupons.filter(
          (coupon) => coupon.category.toString() === Category[filters.category]
        );
      }

      if (filters.title.length > 0) {
        console.log(filters.title);
        filteringCoupons = filteringCoupons.filter((coupon) =>
          coupon.title.toLowerCase().includes(filters.title.toLowerCase())
        );
      }
    }
    return filteringCoupons;
  };

  useEffect(() => {
    const fetchCoupons = async () => {
      const coupons = await publicSerivce.getAllCoupons();
      setCoupons(coupons);
    };

    if (coupons === null || coupons === undefined) {
      if (couponsStore.getState().coupons !== null && undefined) {
        setCoupons(couponsStore.getState().coupons);
      } else {
        fetchCoupons();
      }
    }
    {
      setFilteredCoupons(filterCoupons(filters));
    }

    couponsStore.subscribe(() => {
      if (coupons === null || coupons === undefined) {
        if (couponsStore.getState().coupons === null) {
          fetchCoupons();
        } else {
          setCoupons(couponsStore.getState().coupons);
        }
      }
    });

    authStore.subscribe(() => {
      if (couponsStore.getState().coupons !== null || undefined) {
        setCoupons(null);
      }
    });
    couponsStore.subscribe(() => {
      setCoupons(coupons);
    });
    customerStore.subscribe(() => setCoupons(couponsStore.getState().coupons));
  }, [coupons, filters]);

  return (
    <Box
      sx={{
        display: { md: "grid", xs: "flex" },
        gridTemplateColumns: { md: "20% 1fr" },
        height: "100%",
      }}
    >
      <Box
        sx={{
          gridRow: { xs: 1, md: 0 },
          justifyContent: { md: "start" },
          gridColumn: { md: 1, xs: 0 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Typography
          variant="h4"
          marginTop={16}
          sx={{ textDecoration: "underline" }}
        >
          Filters!
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            type="search"
            variant="outlined"
            value={searchTerm}
            onChange={(event) => {
              const value = String(event.target.value);
              if (titleTimeoutId.current) {
                clearTimeout(titleTimeoutId.current);
              }
              setSearchTerm(event.target.value);
              titleTimeoutId.current = setTimeout(() => {
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  title: value,
                }));
              }, 1000);
            }}
            label="Search"
            placeholder="Enter search term..."
          />
          <br />
          <Typography>Max Price :</Typography>
          <Box
            sx={{
              width: "40%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextField
              type="number"
              sx={{ width: "100%" }}
              defaultValue={0}
              InputProps={{
                inputProps: {
                  min: 0,
                },
              }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const value = Number(event.target.value);
                if (priceTimeoutId.current)
                  clearTimeout(priceTimeoutId.current);
                priceTimeoutId.current = setTimeout(() => {
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    price: value,
                  }));
                }, 1000);
              }}
            />
          </Box>
        </Box>
        <Box
          display={"flex"}
          sx={{
            flexDirection: "column",
            width: "90%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>Category</Typography>
          <Select
            fullWidth
            sx={{ width: "60%" }}
            value={filters.category}
            onChange={(event) => {
              const value = Number(event.target.value);
              if (categoryTimeoutId.current)
                clearTimeout(categoryTimeoutId.current);
              categoryTimeoutId.current = setTimeout(() => {
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  category: value,
                }));
              }, 200);
            }}
          >
            <MenuItem value={-1}>All Categories</MenuItem>
            <MenuItem value={Category.FOOD}>FOOD</MenuItem>
            <MenuItem value={Category.BABY}>BABY</MenuItem>
            <MenuItem value={Category.CARS}>CARS</MenuItem>
            <MenuItem value={Category.ELECTRONICS}>ELECTRONICS</MenuItem>
            <MenuItem value={Category.HOUSE}>HOUSE</MenuItem>
            <MenuItem value={Category.PHONE}>PHONE</MenuItem>
            <MenuItem value={Category.VACATION}>VACATION</MenuItem>
          </Select>
        </Box>
      </Box>

      <Box sx={{ gridColumn: { md: 2 }, height: "100%", width: "100%" }}>
        <CouponCard coupons={filteredCoupons} />
      </Box>
    </Box>
  );
}

export default Home;
