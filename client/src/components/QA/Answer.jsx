import React, { useState } from 'react';
import axios from 'axios';
import * as styles from './qanda.module.css';
import * as g from '../global.module.css';
import Image from '../shared/Image';
import Thumbnail from '../shared/Thumbnail';
import Modal from '../shared/Modal';

function Answer({ answer }) {
  let date = new Date(answer.date);
  date = date.toDateString();
  const [reported, setReported] = useState(false);
  const [isHelpful, setIsHelpful] = useState(false);
  const [helpfulness, setHelpfulness] = useState(answer.helpfulness);
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState(null);

  function report() {
    axios.put(`/qa/answers/${answer.answer_id}/report`)
      .then(() => {
        setReported(true);
      });
  }
  function helpfulHandler() {
    if (!isHelpful) {
      setIsHelpful(true);
      axios.put(`/qa/answers/${answer.answer_id}/helpful`)
        .then(() => {
          setHelpfulness(helpfulness + 1);
        });
    }
  }
  function expandPhoto(photo) {
    setIsOpen(true);
    setUrl(photo);
  }
  return (
    <div className={[styles.answer, g.stack, g.gapSm].join(' ')}>
      <div className={g.textSm}>{answer.body}</div>
      <div>
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
      <div className={[styles.answerDetails, g.textXs].join(' ')}>
        <span>
          {'by '}
        </span>
        <span className={answer.answerer_name === 'Seller' ? styles.sellerName : ''}>
          {answer.answerer_name}
        </span>
        <span>
          {`, ${date.slice(3)}`}
        </span>
        <span>
          {' | Helpful? '}
          <span>
            <input
              className={g.btnLinkify}
              type='button'
              onClick={helpfulHandler}
              value='Yes'
            />
          </span>
          <span>
            {` (${helpfulness})`}
          </span>
        </span>
        <span>
          {' | '}
          <span>
            <input
              type='button'
              className={g.btnLinkify}
              value={reported ? 'Reported' : 'Report'}
              onClick={() => {
                if (!reported) {
                  report();
                }
              }}
            />
          </span>
        </span>
      </div>
    </div>
  );
}

export default Answer;
