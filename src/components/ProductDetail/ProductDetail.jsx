import React, { useContext, useEffect } from "react";
import classes from "./ProductDetail.module.css";
import { useParams } from "react-router-dom";
import { productContext } from "../../Context/ProductContext";
import { useState } from "react";
import { authContext } from "../../Context/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";

const ProductDetail = () => {
  const { id } = useParams();
  const {
    detail,
    getDetail,
    comments,
    getComment,
    addComments,
    deleteComment,
  } = useContext(productContext);
  const [nameVal, setNameVal] = useState("");
  const [commentVal, setCommentVal] = useState("");
  const { auth } = useContext(authContext);
  const [user] = useAuthState(auth);

  useEffect(() => {
    getDetail(id);
    getComment(id);
  }, []);
  function clickAddCommet() {
    let newComment = {
      name: nameVal,
      comment: commentVal,
      id: Date.now(),
    };
    addComments(newComment, id);
  }
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
            <div className={classes.comment}>
              <h2>Коментарии</h2>
              <div className={classes.commentInner}>
                <ul className={classes.commentList}>
                  {comments.length ? (
                    comments.map((comment) => (
                      <li>
                        <div className={classes.commentListName}>
                          Имя: <span>{comment.name}</span>
                        </div>
                        <div className={classes.commentListComment}>
                          Коментарии: <br /> <span>{comment.comment}</span>
                        </div>
                        {/* <i className='bx bx-trash-alt' onClick={() => deleteComment(id,comment.id)}></i> */}
                      </li>
                    ))
                  ) : (
                    <h3>Пока нет коментарии</h3>
                  )}
                </ul>
               {user ?  <div className={classes.commentInp}>
                  <input
                    type="text"
                    value={nameVal}
                    onChange={(e) => setNameVal(e.target.value)}
                    placeholder="Имя"
                  />
                  <textarea
                    type="text"
                    value={commentVal}
                    onChange={(e) => setCommentVal(e.target.value)}
                    placeholder="Коментарии"
                  ></textarea>
                  <button onClick={clickAddCommet}>Отправить</button>
                </div> : <h2 style={{margin:'30px 0'}}>Чтобы оставить коментарии войдите в свой аккаунт!</h2> }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
