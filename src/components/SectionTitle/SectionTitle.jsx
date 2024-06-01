const SectionTitle = ({ title }) => {
  return (
    <div className="mt-14 mb-4 text-center lg:text-start md:mt-20 md:mb-10">
      <h2 className="text-2xl md:text-4xl font-bold text-gray-700 text-center">
        {title}
      </h2>
    </div>
  );
};

export default SectionTitle;
