import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { deliveryDate } from "../../../util/deliveryDate";
import Card from "../../UI/Card";
import Modal from "../../UI/Modal";

import classes from "./Order.module.css";

const Order = () => {
  const location = useLocation();
  const [orderData, setOrderData] = useState(location.state.order);

  const [deleveryFee, setDeleveryFee] = useState(2500);
  const [totalPrice, setTotalPrice] = useState(0);
  const [userData, setUserData] = useState({
    uName: "",
    uEmail: "",
    uPhone: "",
    uMile: 0,
  });

  // zipcode랑 이름 디비 수정 물어보기
  const [delivertData, setDeliveryData] = useState({
    dName: "청길동",
    dZipcode: "",
    dAddr: "",
    dMemo: "",
  });

  const [useMileInut, setUseMileInput] = useState({
    useMile: 0,
    isValid: true,
  });

  const [deliveryMemo, setDeliveryMemo] = useState({
    memo: "",
    isDirect: false,
  });

  const [isShowDeliveryMemo, setIsShowDeliveryMemo] = useState(false);

  const navigate = useNavigate();

  const handleStorageMemo = () => {
    setIsShowDeliveryMemo(false);
    setDeliveryData((prev) => {
      return { ...prev, dMemo: deliveryMemo.memo };
    });
  };

  const handleDeliveryMemo = (value, isDirect) => {
    setDeliveryMemo({ isDirect, memo: value });
  };

  const handleUseMile = (value) => {
    if (+value > userData.uMile) {
      setUseMileInput({ useMile: 0, isValid: false });
      return;
    } else {
      setUseMileInput({ useMile: value, isValid: true });
    }
  };

  // 사용자 포일트가져오기
  const fetchUserData = async () => {
    await axios
      .post("http://localhost:5000/order/get/userData", {
        uId: "test1",
      })
      .then((response) => {
        console.log(response.data.deliveryData[0]);
        const { uName, uEmail, uPhone, uMile } = response.data.userData[0];
        const { dAddr, dMemo } = response.data.deliveryData[0];
        setUserData({
          uName,
          uEmail,
          uPhone,
          uMile: +uMile,
        });

        setDeliveryData((prev) => {
          return { ...prev, dAddr: dAddr, dMemo: dMemo };
        });
      });
  };

  useEffect(() => {
    orderData.map((data) => {
      return setTotalPrice(totalPrice + data.price * data.amount);
    });
    fetchUserData();
  }, []);

  return (
    <div className={classes.order}>
      <div className={classes["order-title"]}>
        <h3>주문 / 결제</h3>
      </div>

      {/* 구매자 정보 컴포넌트 */}
      <div className={classes["order-consumer"]}>
        <h4>구매자 정보</h4>

        <table className={classes["order-consumer-table"]}>
          <tbody>
            <tr>
              <td className={classes["order-consumer-table__col1"]}>이름</td>
              <td className={classes["order-consumer-table__col2"]}>
                {userData.uName}
              </td>
            </tr>
            <tr>
              <td className={classes["order-consumer-table__col1"]}>이메일</td>
              <td className={classes["order-consumer-table__col2"]}>
                {userData.uEmail}
              </td>
            </tr>
            <tr>
              <td className={classes["order-consumer-table__col1"]}>연락처</td>
              <td className={classes["order-consumer-table__col2"]}>
                {userData.uPhone}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 배송지 정보 컴포넌트 */}

      {/* 배송 요청사항 컴포넌트 */}
      {isShowDeliveryMemo && (
        <Modal
          className={classes.modalDeliveryMemo}
          onClose={() => setIsShowDeliveryMemo(false)}
        >
          <header>배송요청사항</header>
          <section>
            <div className={classes["modalDeliveryMemo-select"]}>
              <input
                type="radio"
                onClick={() => handleDeliveryMemo("문앞", false)}
              />
              <span>문 앞</span>
            </div>
            <div className={classes["modalDeliveryMemo-select"]}>
              <input
                type="radio"
                onClick={() =>
                  handleDeliveryMemo("직접 받고 부재시 문 앞", false)
                }
              />
              <span>직접 받고 부재시 문 앞</span>
            </div>
            <div className={classes["modalDeliveryMemo-select"]}>
              <input
                type="radio"
                onClick={() => handleDeliveryMemo("경비실", false)}
              />
              <span>경비실</span>
            </div>

            <div
              className={`${classes["modalDeliveryMemo-select"]} ${classes["modalDeliveryMemo-select__last"]}`}
            >
              <input
                type="radio"
                onClick={() => handleDeliveryMemo("", true)}
              />
              <span>직접 입력</span>
            </div>
            {deliveryMemo.isDirect && (
              <div className={classes["modalDeliveryMemo-directMemo"]}>
                <input
                  type="text"
                  onChange={(e) =>
                    setDeliveryMemo((prev) => {
                      return { ...prev, memo: e.target.value };
                    })
                  }
                />
              </div>
            )}
          </section>

          <div className={classes["modalDeliveryMemo-control"]}>
            <button
              className={classes["modalDeliveryMemo-control__cancle"]}
              onClick={() => setIsShowDeliveryMemo(false)}
            >
              취소
            </button>
            <button
              className={classes["modalDeliveryMemo-control__storage"]}
              onClick={handleStorageMemo}
            >
              저장
            </button>
          </div>
        </Modal>
      )}

      <div className={classes["order-deliveryInfo"]}>
        <h4>받는 사람 정보</h4>

        <table className={classes["order-deliveryInfo-table"]}>
          <tbody>
            <tr>
              <td className={classes["order-deliveryInfo-table__col1"]}>
                이름
              </td>
              <td className={classes["order-deliveryInfo-table__col2"]}>
                {delivertData.dName}
              </td>
            </tr>
            <tr>
              <td className={classes["order-deliveryInfo-table__col1"]}>
                배송지 주소
              </td>
              <td className={classes["order-deliveryInfo-table__col2"]}>
                {delivertData.dAddr}
              </td>
            </tr>
            <tr>
              <td className={classes["order-deliveryInfo-table__col1"]}>
                연락처
              </td>
              <td className={classes["order-deliveryInfo-table__col2"]}>
                연락처 디비 물어보기
              </td>
            </tr>
            <tr>
              <td className={classes["order-deliveryInfo-table__col1"]}>
                배송요청사항
              </td>
              <td className={classes["order-deliveryInfo-table__memo"]}>
                <span>{delivertData.dMemo}</span>
                <button
                  className={classes["order-deliveryInfo-table__changeMemo"]}
                  onClick={() => setIsShowDeliveryMemo(true)}
                >
                  변경
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 배송 상품 정보 컴포넌트 */}
      <div className={classes["order-product"]}>
        <h4>
          {/* 1을 map 돌릴때 수정 */}
          배송 {orderData.length}건 중 1
        </h4>
        {orderData.map((data, key) => {
          return (
            <div className={classes["order-product-info"]} key={key}>
              <p className={classes["order-product-info__deliveryDate"]}>
                {deliveryDate}
              </p>

              <div className={classes["order-product-info__content"]}>
                <Card className={classes["order-product-info__content__img"]}>
                  <img src={data.image} alt={data.title} />
                </Card>

                <div className={classes["order-product-info-content__info"]}>
                  <Link to={"/products/" + data.productId}>
                    <p>상품명 : {data.title}</p>
                  </Link>
                  <p>구매수량 : {data.amount}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* 결제 정보 컴포넌트 */}
      <div>
        <div className={classes["order-paymentInfo"]}>
          <table className={classes["order-paymentInfo-table"]}>
            <tbody>
              <tr>
                <td className={classes["order-paymentInfo-table__col1"]}>
                  총 상품 가격
                </td>
                <td className={classes["order-paymentInfo-table__col2"]}>
                  {totalPrice}원
                </td>
              </tr>
              <tr>
                <td className={classes["order-paymentInfo-table__col1"]}>
                  배송비
                </td>
                <td className={classes["order-paymentInfo-table__col2"]}>
                  {deleveryFee}원
                </td>
              </tr>
              <tr>
                <td className={classes["order-paymentInfo-table__col1"]}>
                  마일리지 사용
                </td>
                <td className={classes["order-paymentInfo-table__mile"]}>
                  <div className={classes["order-paymentInfo-table__useMile"]}>
                    <input
                      type="number"
                      value={useMileInut.useMile}
                      onChange={(e) => handleUseMile(e.target.value)}
                    />
                    <span>원</span>
                    <span
                      className={classes["order-paymentInfo-table__totalMile"]}
                    >
                      보유 마일리지 : <span>{userData.uMile}</span>원
                    </span>
                    {!useMileInut.isValid && (
                      <span
                        className={
                          classes["order-paymentInfo-table__useMileError"]
                        }
                      >
                        보유하신 마일리지보다 사용량이 많습니다.
                      </span>
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td className={classes["order-paymentInfo-table__col1"]}>
                  총 결제금액
                </td>
                <td className={classes["order-paymentInfo-table__col2"]}>
                  {totalPrice + deleveryFee}원
                </td>
              </tr>

              <tr>
                <td className={classes["order-paymentInfo-table__col1"]}>
                  결제 방법
                </td>
                <td className={classes["order-paymentInfo-table__payment"]}>
                  <div
                    className={
                      classes["order-paymentInfo-table__payment__select"]
                    }
                  >
                    <input type="radio" onClick={() => navigate("account")} />
                    <span>계좌이체</span>

                    <input type="radio" onClick={() => navigate("card")} />
                    <span>신용/체크카드</span>

                    <input
                      type="radio"
                      onClick={() => navigate("coperateCard")}
                    />
                    <span>법인카드</span>

                    <input type="radio" onClick={() => navigate("phone")} />
                    <span>휴대폰</span>

                    <input
                      type="radio"
                      onClick={() => navigate("noneAccount")}
                    />
                    <span>무통장입금(가상계좌)</span>
                  </div>

                  <Outlet />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className={classes["order-control"]}>
        <button className={classes["order-control-cancle"]}>취소</button>
        <button className={classes["order-control-buy"]}>결제</button>
      </div>
    </div>
  );
};

export default Order;
