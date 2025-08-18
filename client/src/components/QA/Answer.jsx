import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as styles from './qanda.module.css';
import * as g from '../global.module.css';
import Image from '../shared/Image';
import Thumbnail from '../shared/Thumbnail';
import Modal from '../shared/Modal';

function Answer({ answer }) {
  let date = new Date(answer.date);
  date = date.toDateString();
  const [isReported, setIsReported] = useState(false);
  const [isHelpful, setIsHelpful] = useState(false);
  const [helpfulness, setHelpfulness] = useState(answer.helpfulness);
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const helpful = localStorage.getItem(`helpful_${answer.answer_id}`);
    if (helpful) {
      setIsHelpful(helpful);
    }
  }, [answer.answer_id]);
  function report() {
    axios.put(`/qa/answers/${answer.answer_id}/report`)
      .then(() => {
        setIsReported(true);
      });
  }
  function helpfulHandler() {
    const helpful = localStorage.getItem(`helpful_${answer.answer_id}`);
    if (!helpful) {
      axios.put(`/qa/answers/${answer.answer_id}/helpful`)
        .then(() => {
          setIsHelpful(true);
          localStorage.setItem(`helpful_${answer.answer_id}`, true);
          setHelpfulness(helpfulness + 1);
        });
    }
  }
  function expandPhoto(photo) {
    setIsOpen(true);
    setUrl(photo);
  }
  if (answer.photos.length === 0) {
    return (
      <div className={[styles.answer, g.stack, g.gapSm].join(' ')}>
        <div className={g.textSm}>{answer.body}</div>
        <div className={[styles.answerDetails, g.textXs, g.gapSm].join(' ')}>
          <div>
            {'by '}
            <span className={answer.answerer_name === 'Seller' ? styles.sellerName : ''}>
              {answer.answerer_name}
            </span>
            {`, ${date.slice(3)}`}
          </div>
          <div>
            {' | '}
          </div>
          <div className={styles.helpfulness}>
            {'Helpful? '}
            {isHelpful ? (
              <span>
                &nbsp;
              </span>
            ) : (
              <input
                className={g.btnLinkify}
                type='button'
                onClick={helpfulHandler}
                value='Yes'
              />
            )}
            {` (${helpfulness})`}
          </div>
          <div>
            {' | '}
          </div>
          <div>
            {isReported ? (<div>Reported</div>) : (
              <input
                type='button'
                className={g.btnLinkify}
                value='Report'
                onClick={report}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={[styles.answer, g.stack, g.gapSm].join(' ')}>
      <div className={g.textSm}>{answer.body}</div>
      <div className={[g.flex, g.start, g.gapSm].join(' ')}>
        {answer.photos.map((photo) => (
          <button type='button' className={styles.unstyledBtn} onClick={() => expandPhoto(photo.url)} key={photo.id}>
            <Thumbnail
              className={g.flex}
              src={photo.url}
            />
          </button>
        ))}
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          Module={(
            <Image src={url} setIsOpen={setIsOpen} />
          )}
        />
      </div>
      <div className={[styles.answerDetails, g.textXs, g.gapSm].join(' ')}>
        <div>
          {'by '}
          <span className={answer.answerer_name === 'Seller' ? styles.sellerName : ''}>
            {answer.answerer_name}
          </span>
          {`, ${date.slice(3)}`}
        </div>
        <div>
          {' | '}
        </div>
        <div className={styles.helpfulness}>
          {'Helpful? '}
          {isHelpful ? (
            <span>
              &nbsp;
            </span>
          ) : (
            <input
              className={g.btnLinkify}
              type='button'
              onClick={helpfulHandler}
              value='Yes'
            />
          )}
          {` (${helpfulness})`}
        </div>
        <div>
          {' | '}
        </div>
        <div>
          {isReported ? (<div>Reported</div>) : (
            <input
              type='button'
              className={g.btnLinkify}
              value='Report'
              onClick={report}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Answer;
