import React, { useState } from "react";
import Modal from "../../../UI/Modal";
import DaumPostcode from "react-daum-postcode";

import { AiOutlineUser, AiOutlineSearch } from "react-icons/ai";
import { BiMap } from "react-icons/bi";
import { BsPhoneVibrate } from "react-icons/bs";
import { CiMemoPad } from "react-icons/ci";

import classes from "./ModalOrderDeliveryInfoChange.module.css";
import axios from "axios";
import { useEffect } from "react";

const ModalOrderDeliveryInfoChange = ({ onShow, onAddrDate, defalutAddr }) => {
  const [addInfoValue, setAddInfoValue] = useState({
    uId: "",
    dName: "",
    dZipcode: "",
    dAddr: "",
    dAdditionalAddr: "",
    dPhone: "",
    dMemo: "",
  });

  const [formIsValid, setFormIsValid] = useState(true);

  const [isShowAddrSearch, setIsShowAddrSearch] = useState(false);

  const handleSaveAddr = async () => {
    if (
      !addInfoValue.dName ||
      !addInfoValue.dZipcode ||
      !addInfoValue.dPhone ||
      !addInfoValue.dMemo
    ) {
      setFormIsValid(false);
      return;
    }

    onAddrDate((prev) => {
      return {
        ...prev,
        defaultAddr: {
          ...prev.defaultAddr,
          dName: addInfoValue.dName,
          dZipcode: addInfoValue.dZipcode,
          dAddr: addInfoValue.dAddr,
          dAdditionalAddr: addInfoValue.dAdditionalAddr,
          dPhone: addInfoValue.dPhone,
          dMemo: addInfoValue.dMemo,
        },
      };
    });

    onShow((prev) => {
      return { ...prev, addInfo: false };
    });

    setFormIsValid(true);

    await axios.post("http://localhost:5000/order/api/addAddr", {
      addInfoValue,
    });
  };

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setIsShowAddrSearch(false);
    setAddInfoValue((prev) => {
      return { ...prev, dZipcode: data.zonecode };
    });
    setAddInfoValue((prev) => {
      return { ...prev, dAddr: fullAddress };
    }); // e.g. '?????? ????????? ????????????2??? 20 (?????????1???)'
  };

  useEffect(() => {
    setAddInfoValue((prev) => {
      return { ...prev, uId: defalutAddr.uId };
    });
  }, []);

  return (
    <Modal
      onClose={() =>
        onShow((prev) => {
          return { ...prev, addInfo: false };
        })
      }
      className={classes.modalOrderDeliveryInfoChange}
    >
      <header>
        <h4>????????? ?????? ??????</h4>
      </header>
      <section className={classes["modalOrderDeliveryInfoChange-inputWrap"]}>
        <div className={classes["modalOrderDeliveryInfoChange-input"]}>
          <div className={classes["modalOrderDeliveryInfoChange-iconWrap"]}>
            <AiOutlineUser
              className={classes["modalOrderDeliveryInfoChange-icon"]}
            />
          </div>

          <div className={classes["modalOrderDeliveryInfoChange-input__input"]}>
            <input
              maxLength="5"
              onChange={(e) =>
                setAddInfoValue((prev) => {
                  return { ...prev, dName: e.target.value };
                })
              }
              placeholder="?????? ?????? ????????? ??????????????????"
            />
          </div>
        </div>

        {isShowAddrSearch && (
          <div>
            <DaumPostcode onComplete={handleComplete} />
          </div>
        )}

        <div
          className={`${classes["modalOrderDeliveryInfoChange-input"]} ${classes.enteredAddr}`}
        >
          <div className={classes["modalOrderDeliveryInfoChange-iconWrap"]}>
            <BiMap className={classes["modalOrderDeliveryInfoChange-icon"]} />
          </div>
          <div
            className={classes["modalOrderDeliveryInfoChange-enteredAddrWrap"]}
          >
            <div
              className={
                classes["modalOrderDeliveryInfoChange-input__readOnly"]
              }
            >
              <input
                readOnly
                defaultValue={
                  addInfoValue.dZipcode
                    ? `${addInfoValue.dAddr} [ ${addInfoValue.dZipcode} ]`
                    : ""
                }
              />
              <span
                className={
                  classes[
                    "modalOrderDeliveryInfoChange-enteredAddr-btn__search"
                  ]
                }
                onClick={() => setIsShowAddrSearch(true)}
              >
                <AiOutlineSearch />
              </span>
            </div>

            <div
              className={classes["modalOrderDeliveryInfoChange-input__input"]}
            >
              <input
                onChange={(e) =>
                  setAddInfoValue((prev) => {
                    return { ...prev, dAdditionalAddr: e.target.value };
                  })
                }
                placeholder="??????????????? ??????????????????"
              />
            </div>
          </div>
        </div>

        <div className={classes["modalOrderDeliveryInfoChange-input"]}>
          <div className={classes["modalOrderDeliveryInfoChange-iconWrap"]}>
            <BsPhoneVibrate
              className={classes["modalOrderDeliveryInfoChange-icon"]}
            />
          </div>
          <div className={classes["modalOrderDeliveryInfoChange-input__input"]}>
            <input
              onChange={(e) =>
                setAddInfoValue((prev) => {
                  return { ...prev, dPhone: e.target.value };
                })
              }
              placeholder="?????? ?????? ??????????????? ??????????????????"
            />
          </div>
        </div>

        <div className={classes["modalOrderDeliveryInfoChange-input"]}>
          <div className={classes["modalOrderDeliveryInfoChange-iconWrap"]}>
            <CiMemoPad
              className={classes["modalOrderDeliveryInfoChange-icon"]}
            />
          </div>

          <div className={classes["modalOrderDeliveryInfoChange-input__input"]}>
            <input
              maxLength="50"
              onChange={(e) =>
                setAddInfoValue((prev) => {
                  return { ...prev, dMemo: e.target.value };
                })
              }
              placeholder="??????????????? ??????????????????"
            />
          </div>
        </div>

        {!formIsValid && (
          <p className={classes["modalOrderDeliveryInfoChange-err"]}>
            ??????????????? ?????? ??????????????????.
          </p>
        )}
      </section>

      <div className={classes["modalOrderDeliveryInfoChange-control"]}>
        <button
          className={classes["modalOrderDeliveryInfoChange-control__cancle"]}
          onClick={() =>
            onShow((prev) => {
              return { ...prev, addInfo: false };
            })
          }
        >
          ??????
        </button>
        <button
          className={classes["modalOrderDeliveryInfoChange-control__storage"]}
          onClick={handleSaveAddr}
        >
          ??????
        </button>
      </div>
    </Modal>
  );
};

export default ModalOrderDeliveryInfoChange;
