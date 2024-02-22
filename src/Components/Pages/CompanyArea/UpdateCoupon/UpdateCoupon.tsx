import {
  Box,
  Button,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "./UpdateCoupon.css";
import Category from "../../../Models/Category";
import { useForm } from "react-hook-form";
import errorHandler from "../../../Services/ErrorHandler";
import { readAndCompressImage } from "browser-image-resizer";
import Coupon from "../../../Models/Coupon";
import companyService from "../../../Services/CompanyService";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { companyStore } from "../../../Redux/CompanyStore";
import { Typography } from "@mui/material";
import dateFormat from "dateformat";
import { toast } from "react-toastify";

function UpdateCoupon(): JSX.Element {
  const couponId: number = +useParams().couponId!;

  const [coupon, setCoupon] = useState<Coupon>(
    companyStore
      .getState()
      .company?.coupons?.find((coupon) => coupon?.couponID === couponId)
  );

  useEffect(() => {
    companyStore.subscribe(() => {
      const companyCoupon:Coupon = companyStore.getState().company?.coupons?.find((coupon) => coupon?.couponID === couponId);
      setValue("amount",companyCoupon.amount);
      setValue("category",companyCoupon.category);
      setValue("couponID",companyCoupon.couponID);
      setValue("description",companyCoupon.description);
      setValue("endDate",dateFormat(companyCoupon.endDate,"yyyy-mm-dd"));
      setValue("image",companyCoupon.image);
      setValue("price",companyCoupon.price);
      setValue("startDate",dateFormat(companyCoupon.startDate,"yyyy-mm-dd"));
      setValue("title",companyCoupon.title);
      setCoupon(companyCoupon);
    });
  }, [coupon]);
  const navigate = useNavigate();

  const { register, handleSubmit, formState, setValue } = useForm<Coupon>({
    mode: "onBlur",
    defaultValues: {
      couponID: coupon?.couponID,
      category: coupon?.category,
      title: coupon?.title,
      description: coupon?.description,
      amount: coupon?.amount,
      price: coupon?.price,
      startDate: dateFormat(coupon?.startDate, "yyyy-mm-dd"),
      endDate: dateFormat(coupon?.endDate, "yyyy-mm-dd"),
      image: coupon?.image,
    },
  });

  const convertToBase64 = (blob: Blob) => {
    return new Promise((resolve) => {
      var reader = new FileReader();
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  };

  const configResizeImage = {
    quality: 1,
    maxWidth: 640,
    maxHeight: 480,
    debug: true,
  };

  const couponStartDate = dateFormat(coupon?.startDate, "yyyy-mm-dd");

  async function sendCoupon(coupon: Coupon) {
    if (
      (coupon.image as FileList).length > 0 &&
      (coupon.image as FileList).length < 2
    ) {
      console.log(coupon.image);
      let image = await readAndCompressImage(
        (coupon.image as FileList)[0],
        configResizeImage
      );
      coupon.image = await convertToBase64(image);
      companyService
      .updateCoupon(coupon)
      .then((couponId) => {
        console.log(couponId);
        navigate("/coupon/" + coupon.couponID);
      })
      .catch((err) => errorHandler.showError(err));
    } else if ((coupon.image as FileList).length !== 0) {
      companyService
        .updateCoupon(coupon)
        .then((couponId) => {
          console.log(couponId);
          navigate("/coupon/" + coupon.couponID);
        })
        .catch((err) => errorHandler.showError(err));
    } else {
      toast.error("Must enter image!");
    }
  }

  return (
    <div className="UpdateCoupon">
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "5%" }}>
        <Box
          sx={{
            backgroundColor: "rgb(255, 253, 231, 0.5)",
            height: "60%",
            width: "35%",
            minWidth: 550,
            minHeight: 350,
            overflow: "auto",
          }}
        >
          <h2>Update Coupon</h2>
          <form onSubmit={handleSubmit(sendCoupon)} className="AddCustomerForm">
            <TextField
              sx={{ width: "60%", maxWidth: { md: "50%" } }}
              label="Title"
              id="title"
              {...register("title")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
            />

            <TextField
              sx={{ width: "80%", minWidth: "200px", maxWidth: { md: "80%" } }}
              label="Description"
              id="description"
              minRows={5}
              multiline={true}
              maxRows={20}
              {...register("description")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
            />

            <div className="inputNumberDiv">
              <TextField
                sx={{ width: "32%" }}
                label="Amount"
                id="amount"
                type="number"
                {...register("amount")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
              />

              <TextField
                sx={{ width: "32%" }}
                type="number"
                label="Price"
                id="price"
                {...register("price")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
              />
            </div>

            <div className="DateDiv">
              <TextField
                sx={{ width: "35%", minWidth: "150px" }}
                type="date"
                id="startDate"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
                label="startDate"
                defaultValue={couponStartDate ? couponStartDate : null}
                {...register("startDate")}
              />

              <TextField
                sx={{ width: "34%", minWidth: "150px" }}
                type="date"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
                id="endDate"
                label="endDate"
                defaultValue={dateFormat(coupon?.endDate, "yyyy-mm-dd")}
                {...register("endDate")}
              />
            </div>
            <InputLabel id="CategoryLabel">Category</InputLabel>
            <Select
              labelId="CategoryLabel"
              defaultValue={Category.VACATION}
              id="CategorySelect"
              name="category"
              {...register("category")}
            >
              {Object.keys(Category)
                .filter((key) => isNaN(Number(key)))
                .map((key) => (
                  <MenuItem
                    {...register("category")}
                    key={key}
                    value={Category[key as unknown as number]}
                  >
                    {key}
                  </MenuItem>
                ))}
            </Select>
            <InputLabel htmlFor="image">Coupon Image</InputLabel>
            <Input
              id="image"
              type="file"
              sx={{ width: "35%", minWidth: "220px" }}
              {...register("image")}
            />
            <Typography>Current coupon image</Typography>
            <img width={"80%"} src={coupon?.image as string}></img>

            <Button type="submit" size="large">
              Submit
            </Button>
          </form>
        </Box>
      </Box>
    </div>
  );
}

export default UpdateCoupon;
