import Authform from './components/Authform';

export default function Home() {
  return (
    <div
      className={`flex flex-col justify-center min-h-full py-12 bg-slate-300 sm:px-6 lg:px-8`}
    >
      <div className={`sm:mx-auto sm:w-full sm:max-w-md`}>
        <h2
          className={`mt-6 text-3xl font-bold tracking-tight text-center text-gray-900`}
        >
          로그인 & 회원가입
        </h2>
      </div>
      {/* 로그인인지 회원가입인지 분기처리 하는 컴포넌트 */}
      <Authform />
    </div>
  );
}
