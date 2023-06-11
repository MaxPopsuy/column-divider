import React, { useEffect, useState } from "react";
import styles from "./DividerPage.module.scss";
import classnames from "classnames";
import AutoscaleInput from "@components/AutoscaleInput/AutoscaleInput";

//  t === divident
//  k === diviser
//  remainder === remainder of the division
//  tempResult === intermediate result from division
//  result === result of division
//  toDigits === number of digits after comma
//  t === divident
//  k === diviser
//  remainder === remainder of the division
//  tempResult === intermediate result from division
//  result === result of division
//  toDigits === number of digits after comma

function Calculator() {
  const [dividend, setDividend] = useState(0);
  const [divisor, setDivisor] = useState(0);
  const [quotient, setQuotient] = useState("");
  const [afterComma, setAfterComma] = useState(false);
  const [maxIndex, setMaxIndex] = useState(0);
  // const [remainder, setRemainder] = useState(0);
  const [actions, setActions] = useState([]);

  const handleDividendChange = (e) => {
    setDividend(e.target.value);
  };

  const handleDivisorChange = (e) => {
    setDivisor(e.target.value);
  };
  let num = dividend;
  let numString = num.toString();
  let numArray = numString.split("");

  let t = null;
  let k = +divisor;
  let remainder = "";
  let tempResult = null;
  let result = "";
  let toDigits = 3;
  let m = 0;
  let divArray = numArray;

  const handleCalculate = () => {
    let maxIndex = numArray.length - 1;
    setActions([]);
    for (let i = 0; i <= maxIndex; i++) {
      if (divArray.length === 0) break;
      if (divArray[0] === NaN) break;

      if (num < k) {
        remainder = num;
        result += "0";
        break;
      }
      if (divArray.length === 1 && remainder !== 0) {
        break;
      }
      t = getT(divArray, i, k, remainder);
      if (t < k) {
        result += "0";
        remainder = t;
        break;
      }
      tempResult = Math.floor(t / k);
      const numb = t;
      const floor = Math.floor(t / k);
      setActions((ps) => [
        ...ps,
        {
          number: numb,
          result: t,
          multiplier: floor,
          source: numArray[i],
        },
      ]);
      remainder = t % k;
      divArray = divArray.slice(m + 1);
      if (remainder !== 0) {
        divArray.unshift(remainder);
      }
      result += tempResult;
    }

    if (remainder !== 0) {
      result += ",";
      for (let i = 0; i < toDigits; i++) {
        t = remainder + "0";
        tempResult = Math.floor(t / k);
        remainder = t % k;
        result += tempResult;
      }
    }

    function getT(arr, index, num, remainder) {
      m = 0;
      t = arr[m];

      if (t < k) {
        for (let i = 1; i < arr.length + 1; i++) {
          if (remainder === 0 && arr[index] === "0" && i !== 0) {
            result += "0";
            break;
          }
          if (m + 1 > arr.length) {
            result += "0";
            remainder = arr[index];
            break;
          } else {
            if (t >= k) {
              break;
            }
            if (m + 1 > arr.length - 1) break;
            if (t < k && index !== 0 && remainder === 0) result += "0";
            t += arr[index === 0 ? m + 1 : m + 1];
            if (t < k && index !== 0) result += "0";
            m++;
          }
        }
      }
      return t;
    }
    setQuotient(result);
  };

  const renderTd = (index) => {
    const tdTags = [];

    Array.from({ length: index }).forEach((_, i) => {
      tdTags.push(<td key={i}></td>);
    });

    // Using a for loop
    // for (let i = 0; i < index; i++) {
    //   tdTags.push(<td key={i}>Content</td>);
    // }

    return tdTags;
  };

  useEffect(() => {
    if (remainder !== 0) {
      result += ",";
      for (let i = 0; i < toDigits; i++) {
        t = remainder + "0";
        tempResult = Math.floor(t / k);
        remainder = t % k;
        result += tempResult;
      }
    }
  }, [remainder]);

  useEffect(() => {
    if (!afterComma) {
      setQuotient(quotient.split(",")[0]);
    }
  }, [quotient, afterComma]);

  return (
    <div className={styles.page}>
      <h2 className={styles.page__title}>Division Calculator</h2>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.form__wrapper}>
          <label className={styles.form__label}>
            Show symbols after comma:
          </label>
          <input
            type="checkbox"
            className={styles.form__input}
            value={afterComma}
            onChange={() => setAfterComma(!afterComma)}
          />
        </div>
        <div className={styles.form__wrapper}>
          <AutoscaleInput
            type={"number"}
            value={dividend}
            handlerFn={handleDividendChange}
            placeholder={"Dividend"}
          />
        </div>
        <label
          className={classnames(
            styles.form__label,
            styles["form__label--divider"]
          )}
        >
          /
        </label>
        <div className={styles.form__wrapper}>
          <AutoscaleInput
            type={"number"}
            value={divisor}
            handlerFn={handleDivisorChange}
            placeholder={"Divisor"}
          />
        </div>

        <button className={styles.form__submit} onClick={handleCalculate}>
          Calculate
        </button>
        {/* <div className="result-container">
          <label className="label">Quotient:</label>
          <input type="text" className="result" value={quotient} readOnly />
        </div>
        <div className="result-container">
          <label className="label">Remainder:</label>
          <input type="text" className="result" value={remainder} readOnly />
        </div> */}
      </form>
      <div className={classnames(styles.result__wrapper, !quotient && styles["result__wrapper--hidden"])}>
        <table cellSpacing={"0"} className={styles.table}>
          <tbody className={styles.table__body}>
            <tr className={styles.table__row}>
              <td
                rowSpan={"2"}
                style={{ padding: "2px" }}
                className={styles.table__data}
              >
                -
              </td>
              {dividend
                .toString()
                .split("")
                .map((e, ind) => (
                  <td className={styles.table__data} key={ind}>
                    {e}
                  </td>
                ))}
            </tr>
            {actions.map((action, i) => {

              return (
                <React.Fragment key={i}>
                  <tr className={styles.result__row}>
                    {renderTd(i === 0 ? i : i)}
                    {i !== 0 && <td rowSpan={"2"}>-</td>}
                    {i !== 0
                      ? action.number
                          .toString()
                          .split("")
                          .map((e, ind) => {

                            return (
                              <>
                                <td
                                  className={classnames(styles.table__data)}
                                  key={ind}
                                >
                                  {e}
                                </td>
                              </>
                            );
                          })
                      : (divisor * action.multiplier)
                          .toString()
                          .split("")
                          .map((e, ind) => {
                            return (
                              <>
                                <td
                                  className={classnames(
                                    styles.table__data,
                                    styles["table__data--last"]
                                  )}
                                  key={ind}
                                >
                                  {e}
                                </td>
                              </>
                            );
                          })}

                    {/* {index < maxIndex && renderTd(index)} */}
                    {/* <td rowSpan={"2"}>{action.number}</td> */}
                    {/* {i === 0 && <td>|</td>} */}
                    {/* {i === 0 && <td>{quotient}</td>}  */}
                    {/* <td>|</td> */}
                    {/* <td></td> */}
                  </tr>
                  <tr className={styles.table__row}>
                    {renderTd(i)}
                    {i !== 0 &&
                      (divisor * action.multiplier)
                        .toString()
                        .split("")
                        .map((e, ind) => {
                          return (
                            <>
                              <td
                                className={classnames(
                                  styles.table__data,
                                  styles["table__data--last"]
                                )}
                                key={ind}
                              >
                                {e}
                              </td>
                            </>
                          );
                        })}
                    {/* <td></td> */}
                  </tr>
                  <tr className={styles.table__row}>
                    {renderTd(i + 2)}
                    {(action.number - divisor * action.multiplier)
                      .toString()
                      .split("")
                      .map((e, ind) => {
                        return (
                          <>
                            <td
                              className={classnames(styles.table__data)}
                              key={ind}
                            >
                              {e}
                            </td>
                          </>
                        );
                      })}
                    {/* <td>{+action.number - divisor * action.multiplier}</td> */}
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
          <tbody
            className={classnames(
              styles.table__body,
              styles["table__body--divide"]
            )}
          >
            <tr
              className={classnames(
                styles.table__row,
                styles["table__row--divide"]
              )}
            >
              <td
                className={classnames(
                  styles.table__data,
                  styles["table__data--divide"],
                  styles["table__data--bottom"]
                )}
              >
                {divisor}
              </td>
            </tr>
            <tr
              className={classnames(
                styles.table__row,
                styles["table__row--divide"]
              )}
            >
              <td
                className={classnames(
                  styles.table__data,
                  styles["table__data--divide"]
                )}
              >
                {quotient}
              </td>
            </tr>
          </tbody>
        </table>
        <div className={styles.actions}>
          <h2 className={actions.title}>Actions list:</h2>
          {actions.map((action, i) => {
            return (
              <div className={styles.action} key={i}>
                <h4 className={styles.action__text}>
                  {divisor}*{action.multiplier} = {divisor * action.multiplier}
                </h4>
                <h4 className={styles.action__text}>
                  {action.number}-{divisor * action.multiplier} ={" "}
                  {+action.number - divisor * action.multiplier}
                </h4>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Calculator;
