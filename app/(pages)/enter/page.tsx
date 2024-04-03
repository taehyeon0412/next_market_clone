"use client";

import Button from "@/app/_components/button";
import Input from "@/app/_components/input";
import Layout from "@/app/_components/layout";
import React from "react";
import { login } from "./action";
import { useFormState } from "react-dom";
import { PASSWORD_MIN_LENGTH } from "@/app/_libs/_server/constants";
import Link from "next/link";

export default function Enter() {
  const [state, action] = useFormState(login, null);
  /* from action을 실행하면 action.ts의  handleForm이 실행되고 
  return 값을 state로 받아옴 
  useFormState는 상호작용을 하므로 use client를 상단에 써야됨
  */

  return (
    <Layout canGoBack>
      <div className="mt-16 px-4">
        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            width="200"
            height="200"
            viewBox="0 0 48 48"
            enableBackground="new 0 0 48 48"
            xmlSpace="preserve"
          >
            <g>
              <path
                fill="#388E3C"
                d="M42.588,18.875c-0.033-0.043-0.066-0.079-0.084-0.103c-0.522-0.646,0.229-0.135,0.425-0.402   c0.233-0.318-0.492-0.91-0.688-1.076c-0.359-0.292-0.837-0.544-1.304-0.613c0.174,0.014,0.576,0.003,0.562-0.229   c-0.015-0.239-0.589-0.523-0.764-0.62c-0.392-0.224-0.8-0.43-1.244-0.551c-0.371-0.102-0.729-0.059-1.086-0.096   c0.121-0.078,0.28-0.127,0.388-0.258c-0.396-0.617-2.224-0.343-2.658,0.121c0.213-0.245,0.331-0.461-0.095-0.478   c-0.296-0.011-0.578,0.121-0.854,0.209c-4.222,1.311-6.993,4.203-7.879,5.177c-0.914,1.011-1.252,1.9-1.252,1.9   c1.23-1.158,2.683-2.295,4.29-3.141c0.964-0.508,2.813-1.219,3.851-0.506c0.251,0.172,0.467,0.369,0.774,0.434   c0.03-0.1,0.098-0.174,0.085-0.297c0.248,0.34,0.006,0.826,0.283,1.203c0.358,0.491,0.717,0.268,1.088-0.023   c-0.139,0.426,0.007,1.025,0.26,1.38c0.272,0.389,0.783,0.375,0.916-0.121c0.097,0.543,0.664,2.347,1.545,1.519   c0.513-0.486,0.767-1.618,0.523-2.224c0.299,0.348,0.598,1.051,1.009,1.375c0.365,0.296,0.823,0.347,1.267,0.077   c0.613-0.361,0.613-1.006,0.607-1.625c0-0.383,0.123-0.133,0.34-0.201C43.192,19.608,42.795,19.118,42.588,18.875z"
              />
              <path
                fill="#388E3C"
                d="M29.135,5.415c0.04,0.032,0.079,0.064,0.101,0.085c0.647,0.519,0.134-0.231,0.406-0.425   c0.315-0.234,0.907,0.488,1.071,0.688c0.29,0.357,0.543,0.838,0.612,1.303c-0.013-0.174,0-0.572,0.23-0.559   c0.24,0.016,0.524,0.588,0.621,0.763c0.224,0.392,0.432,0.799,0.55,1.246c0.104,0.37,0.059,0.729,0.097,1.086   c0.077-0.124,0.128-0.28,0.257-0.391c0.618,0.4,0.344,2.227-0.12,2.66c0.244-0.211,0.461-0.332,0.475,0.097   c0.013,0.295-0.118,0.577-0.206,0.854c-1.314,4.221-4.204,6.995-5.178,7.879c-1.011,0.917-1.896,1.255-1.896,1.255   c1.157-1.231,2.292-2.684,3.14-4.293C29.8,16.7,30.512,14.85,29.8,13.811c-0.172-0.248-0.371-0.466-0.435-0.776   c0.1-0.029,0.174-0.094,0.296-0.082c-0.343-0.251-0.827-0.008-1.201-0.286c-0.489-0.357-0.267-0.715,0.023-1.088   c-0.423,0.143-1.023-0.008-1.379-0.26c-0.391-0.274-0.375-0.786,0.121-0.92c-0.545-0.094-2.346-0.66-1.518-1.544   c0.486-0.511,1.614-0.766,2.222-0.522c-0.348-0.299-1.05-0.597-1.373-1.008c-0.299-0.368-0.348-0.827-0.08-1.269   c0.362-0.613,1.006-0.611,1.627-0.608c0.382,0,0.128-0.124,0.197-0.339C28.399,4.808,28.888,5.205,29.135,5.415z"
              />
            </g>
            <path
              fill="#4CAF50"
              d="M41.614,6.387C40.791,5.563,40,6.091,39.352,6.749c0.193-0.268-0.042-0.641-0.373-0.736  c-0.331-0.094-0.635,0.086-0.842,0.293c-0.423,0.426-0.418,1.048-0.413,1.628c-0.325-0.699-1.136-0.361-1.406,0.202  c-0.237,0.496-0.245,1.078-0.155,1.619c-0.279-0.307-0.743-0.307-1.082,0.074c-0.973,1.1-1.092,4.063-6.074,8.923  c-0.074,0.071,0.185,0.306,0.236,0.258c6.084-5.858,7.769-4.958,9.052-6.046c0.323-0.274-0.018-0.508-0.309-0.605  c0.382-0.026,0.764-0.087,1.142-0.139c0.468-0.069,1.036-0.163,1.384-0.521c0.218-0.227,0.429-0.603,0.266-0.923  c-0.17-0.342-0.501-0.284-0.82-0.339c0.582-0.072,1.317-0.224,1.777-0.646c0.225-0.207,0.403-0.461,0.358-0.782  c-0.033-0.227-0.233-0.665-0.532-0.567C42.149,7.945,42.136,6.909,41.614,6.387z"
            />
            <path
              fill="#FF9800"
              d="M31.033,27.067c1.96-2.044,1.883-5.492-1.357-8.73c-3.237-3.244-6.689-3.325-8.691-1.323  C16.719,21.712,5.924,39.766,7.088,40.931C8.061,41.903,24.669,32.417,31.033,27.067z"
            />
            <g>
              <path
                fill="#EF6C00"
                d="M19.932,28.39c0.195,0.195,0.452,0.293,0.708,0.293s0.512-0.098,0.707-0.293   c0.392-0.391,0.392-1.025,0-1.416l-4.458-4.461c-0.37,0.55-0.748,1.121-1.127,1.705L19.932,28.39z"
              />
              <path
                fill="#EF6C00"
                d="M19.529,18.794l1.929,1.931c0.196,0.195,0.452,0.293,0.708,0.293s0.512-0.098,0.707-0.293   c0.392-0.391,0.392-1.024,0-1.416l-2.077-2.079C20.416,17.665,19.99,18.188,19.529,18.794z"
              />
              <path
                fill="#EF6C00"
                d="M9.45,36.925c0.195,0.196,0.451,0.294,0.707,0.294s0.512-0.098,0.708-0.294   c0.391-0.391,0.391-1.023,0-1.415l-1.157-1.158c-0.352,0.652-0.677,1.272-0.973,1.859L9.45,36.925z"
              />
              <path
                fill="#EF6C00"
                d="M26.867,25.316c-0.391-0.391-1.023-0.391-1.415,0c-0.391,0.391-0.391,1.024,0,1.416l2.613,2.614   c0.575-0.413,1.12-0.816,1.626-1.205L26.867,25.316z"
              />
              <line
                fill="none"
                stroke="#EF6C00"
                strokeWidth="2"
                strokeLinecap="round"
                x1="13.979"
                y1="30.981"
                x2="17.03"
                y2="34.033"
              />
            </g>
          </svg>
        </div>

        <div className="mt-8">
          <div className="flex flex-col items-center">
            <h5 className="text-sm text-gray-500 font-medium">입장하기 :</h5>
          </div>

          <form action={action} className="flex flex-col">
            <div className="mt-1">
              <Input
                name="email"
                label=""
                type="email"
                placeholder="이메일 주소"
                errors={state?.fieldErrors.email} //useFormState의 state를 받아오고 handleForm의 return값이 출력됨
                required
              />
              <Input
                name="password"
                label=""
                type="password"
                placeholder="비밀번호"
                errors={state?.fieldErrors.password}
                required
              />
            </div>

            <Button text={"로그인"} type="login" />
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute w-full border-t border-gray-300" />
              {/* 중간 라인 선 */}
              <div className="relative -top-3 text-center">
                <span className="bg-white px-2 text-sm text-gray-500">
                  다른 입장 방법
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-2">
              <Link
                href="/kakao/start"
                className="flex gap-2 justify-center items-center py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <g>
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3zm5.907 8.06l1.47-1.424a.472.472 0 0 0-.656-.678l-1.928 1.866V9.282a.472.472 0 0 0-.944 0v2.557a.471.471 0 0 0 0 .222V13.5a.472.472 0 0 0 .944 0v-1.363l.427-.413 1.428 2.033a.472.472 0 1 0 .773-.543l-1.514-2.155zm-2.958 1.924h-1.46V9.297a.472.472 0 0 0-.943 0v4.159c0 .26.21.472.471.472h1.932a.472.472 0 1 0 0-.944zm-5.857-1.092l.696-1.707.638 1.707H9.092zm2.523.488l.002-.016a.469.469 0 0 0-.127-.32l-1.046-2.8a.69.69 0 0 0-.627-.474.696.696 0 0 0-.653.447l-1.661 4.075a.472.472 0 0 0 .874.357l.33-.813h2.07l.299.8a.472.472 0 1 0 .884-.33l-.345-.926zM8.293 9.302a.472.472 0 0 0-.471-.472H4.577a.472.472 0 1 0 0 .944h1.16v3.736a.472.472 0 0 0 .944 0V9.774h1.14c.261 0 .472-.212.472-.472z" />
                  </g>
                </svg>
                카카오톡
              </Link>

              <Link
                href="/github/start"
                className="flex gap-2 justify-center items-center py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <svg
                  className="w-5 h-5 "
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 438.549 438.549"
                >
                  <g>
                    <path
                      d="M409.132,114.573c-19.608-33.596-46.205-60.194-79.798-79.8C295.736,15.166,259.057,5.365,219.271,5.365
		c-39.781,0-76.472,9.804-110.063,29.408c-33.596,19.605-60.192,46.204-79.8,79.8C9.803,148.168,0,184.854,0,224.63
		c0,47.78,13.94,90.745,41.827,128.906c27.884,38.164,63.906,64.572,108.063,79.227c5.14,0.954,8.945,0.283,11.419-1.996
		c2.475-2.282,3.711-5.14,3.711-8.562c0-0.571-0.049-5.708-0.144-15.417c-0.098-9.709-0.144-18.179-0.144-25.406l-6.567,1.136
		c-4.187,0.767-9.469,1.092-15.846,1c-6.374-0.089-12.991-0.757-19.842-1.999c-6.854-1.231-13.229-4.086-19.13-8.559
		c-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559
		c-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-0.951-2.568-2.098-3.711-3.429c-1.142-1.331-1.997-2.663-2.568-3.997
		c-0.572-1.335-0.098-2.43,1.427-3.289c1.525-0.859,4.281-1.276,8.28-1.276l5.708,0.853c3.807,0.763,8.516,3.042,14.133,6.851
		c5.614,3.806,10.229,8.754,13.846,14.842c4.38,7.806,9.657,13.754,15.846,17.847c6.184,4.093,12.419,6.136,18.699,6.136
		c6.28,0,11.704-0.476,16.274-1.423c4.565-0.952,8.848-2.383,12.847-4.285c1.713-12.758,6.377-22.559,13.988-29.41
		c-10.848-1.14-20.601-2.857-29.264-5.14c-8.658-2.286-17.605-5.996-26.835-11.14c-9.235-5.137-16.896-11.516-22.985-19.126
		c-6.09-7.614-11.088-17.61-14.987-29.979c-3.901-12.374-5.852-26.648-5.852-42.826c0-23.035,7.52-42.637,22.557-58.817
		c-7.044-17.318-6.379-36.732,1.997-58.24c5.52-1.715,13.706-0.428,24.554,3.853c10.85,4.283,18.794,7.952,23.84,10.994
		c5.046,3.041,9.089,5.618,12.135,7.708c17.705-4.947,35.976-7.421,54.818-7.421s37.117,2.474,54.823,7.421l10.849-6.849
		c7.419-4.57,16.18-8.758,26.262-12.565c10.088-3.805,17.802-4.853,23.134-3.138c8.562,21.509,9.325,40.922,2.279,58.24
		c15.036,16.18,22.559,35.787,22.559,58.817c0,16.178-1.958,30.497-5.853,42.966c-3.9,12.471-8.941,22.457-15.125,29.979
		c-6.191,7.521-13.901,13.85-23.131,18.986c-9.232,5.14-18.182,8.85-26.84,11.136c-8.662,2.286-18.415,4.004-29.263,5.146
		c9.894,8.562,14.842,22.077,14.842,40.539v60.237c0,3.422,1.19,6.279,3.572,8.562c2.379,2.279,6.136,2.95,11.276,1.995
		c44.163-14.653,80.185-41.062,108.068-79.226c27.88-38.161,41.825-81.126,41.825-128.906
		C438.536,184.851,428.728,148.168,409.132,114.573z"
                    />
                  </g>
                </svg>
                깃허브
              </Link>

              {/*  <Link
                href="/sms"
                className="flex gap-2 justify-center items-center py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                  />
                </svg>
                휴대폰
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
