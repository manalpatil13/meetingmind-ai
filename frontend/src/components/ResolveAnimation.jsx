function ResolveAnimation({ stage }) {

    const bars = Array.from({ length: 28 });

    return (
        <div className="resolve-container">

            {bars.map((_, index) => {

                const active =
                    index <= stage * 7;

                return (

                    <div
                        key={index}
                        className={
                            active
                                ? "resolve-bar active"
                                : "resolve-bar"
                        }
                    />

                );
            })}

        </div>
    );
}

export default ResolveAnimation;