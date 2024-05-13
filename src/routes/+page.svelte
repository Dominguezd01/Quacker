<main>
    <p
        class="text-[220px] font-bold grid items-center quackerTitle justify-center text-white font-[prompt] transition-all hover:text-quacker"
    >
        QUACKER
    </p>

    <div
        class="flex gap-10 items-center justify-center mb-[-50px] m-40 buttonContainer"
    >
        <a
            href="/users/auth/register"
            class="grid w-[250px] text-[40px] h-24 items-center font-bold text-center text-white bg-green-700 rounded-lg p-4 hover:bg-quacker transition 0.25s"
        >
            REGISTER</a
        >

        <a
            href="/users/auth/login"
            class="grid w-[250px] h-24 items-center text-[40px] font-bold text-center text-white bg-green-700 rounded-lg p-4 hover:bg-quacker transition 0.25s"
        >
            LOGIN</a
        >
    </div>
</main>

<style>
    main {
        height: 100vh;
        background: rgb(11, 11, 11);
    }

    @media (min-width: 100px) and (max-width: 1900px) {
        main {
            display: flex;
            flex-direction: column;
            width: 100%;
            overflow-x: hidden;
        }
        .quackerTitle {
            font-size: 50px;
        }
        .buttonContainer {
            display: grid;
        }
        .buttonContainer a {
            width: 200px;
            font-size: 2em;
        }
    }

    p {
        transition: 1s;
    }
</style>
