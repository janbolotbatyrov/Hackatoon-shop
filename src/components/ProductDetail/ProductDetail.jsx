import React, { useContext, useEffect } from "react";
import classes from "./ProductDetail.module.css";
import { useParams } from "react-router-dom";
import { productContext } from "../../Context/ProductContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { detail, getDetail } = useContext(productContext);
  useEffect(() => {
    getDetail(id);
  }, []);
  return (
    <div className={classes.detail}>
      <div className="container">
        <div className={classes.detailInner}>
          <div className={classes.detailImg}>
            <img src={detail.image} alt="" />
          </div>
          <div className={classes.detailContent}>
            <div className={classes.detailStars}>
              <i class="bx bx-star"></i>
              <i class="bx bx-star"></i>
              <i class="bx bx-star"></i>
              <i class="bx bx-star"></i>
              <i class="bx bx-star"></i>
            </div>
            <div className={classes.detailTitle}>{detail.title}</div>
            <div className={classes.detailPrice}>{detail.price} &#x20bd;</div>
            <div className={classes.detailSize}>
              <div className={classes.detailSizeTitle}>Размер</div>
              <div className={classes.detailSizeBlocks}>
                <div className={classes.detailSizeBlockItem}>s</div>
                <div className={classes.detailSizeBlockItem}>m</div>
                <div className={classes.detailSizeBlockItem}>l</div>
                <div className={classes.detailSizeBlockItem}>xl</div>
              </div>
            </div>
            <div className={classes.detailBtn}>В корзину</div>
            <div className={classes.detailHr}></div>
            <div className={classes.detailSpec}>
              <h2>Характеристики</h2>
              <div className={classes.detailSpecInner}>
                <div>
                  <p>Страна</p>
                  <span>Турция</span>
                </div>
                <div>
                  <p>Состав</p>
                  <span>Кашемир</span>
                </div>
              </div>
            </div>
            <div className={classes.detailHr}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
