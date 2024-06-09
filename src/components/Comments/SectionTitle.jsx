
const SectionTitle = ({title, description}) => {
    return (
        <div className="mx-0 md:mx-20 mt-20 mb-10 flex flex-col justify-center items-center">
        <div className="border-b-2 border-cyan-400 mb-2 pb-2 w-fit">
            <p className="text-3xl border-b-2font-bold text-center ">{title}</p>
        </div>
        <p className="text-center text-slate-700">{description}</p>
    </div>
    );
};

export default SectionTitle;