export default function MarketingGrid() {
  const apps = [
    {
      id: 1,
      title: "Lantai SPC/Vinyl",
      tag: "Home & Decor",
      desc: "Kami menyediakan berbagai jenis lantai vinyl & spc",
      img: "/img/marketingGrid-1.png",
    },
    {
      id: 2,
      title: "Tufting Rugs Adhesive",
      tag: "Lem & Crafts",
      desc: "Lem untuk keperluan tufting rug",
      img: "/img/marketingGrid-2.png",
    },
    {
      id: 3,
      title: "Plint Premium",
      tag: "List Aksesoris",
      desc: "List Plint Premium, tidak mudah pecah & pasti last long",
      img: "/img/marketingGrid-3.png",
    },
    {
      id: 4,
      title: "List Aksesoris",
      tag: "Aksesoris",
      desc: "Semua jenis aksesoris list, beragam warna",
      img: "/img/marketingGrid-4.png",
    },
  ];

  return (
    <section className="bg-[#f4f4f4] p-6 md:p-20">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-6 items-stretch">
          {/* LEFT SIDE (Top + Bottom stacked) */}
          <div className="flex flex-col gap-6 flex-1">
            {/* Top Left */}
            <div className="bg-white rounded-2xl overflow-hidden flex flex-row justify-between flex-1 border-1 border-[#CACACA]">
              <div className="p-6 flex-1">
                <span className="bg-[#F3F3F3] text-gray-600 text-xs px-3 py-1 rounded-full">
                  {apps[0].tag}
                </span>
                <h3 className="text-2xl font-semibold mt-3">{apps[0].title}</h3>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  {apps[0].desc}
                </p>
              </div>
              <img
                src={apps[0].img}
                alt={apps[0].title}
                className="w-full h-56 object-cover flex-1"
              />
            </div>

            {/* Bottom Row (2 small ones) */}
            <div className="flex flex-col md:flex-row gap-6 flex-1">
              {[apps[2], apps[3]].map((app) => (
                <div
                  key={app.id}
                  className="flex-1 bg-white rounded-2xl overflow-hidden flex flex-col justify-between border-1 border-[#CACACA]"
                >
                  <div className="p-6">
                    <span className="bg-[#F3F3F3] text-gray-600 text-xs px-3 py-1 rounded-full">
                      {app.tag}
                    </span>
                    <h3 className="text-2xl font-semibold mt-3">{app.title}</h3>
                    <p className="text-gray-600 mt-2 leading-relaxed">
                      {app.desc}
                    </p>
                  </div>
                  <img
                    src={app.img}
                    alt={app.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE (Tall) */}
          <div className="w-full md:w-[380px] bg-white rounded-2xl overflow-hidden flex flex-col justify-between border-1 border-[#CACACA]">
            <div className="p-6 flex-grow flex flex-col">
              <span className="bg-[#F3F3F3] text-gray-600 w-fit text-xs px-3 py-1 rounded-full">
                {apps[1].tag}
              </span>
              <h3 className="text-2xl font-semibold mt-3">{apps[1].title}</h3>
              <p className="text-gray-600 mt-2 leading-relaxed">
                {apps[1].desc}
              </p>
              <div className="mt-auto flex justify-center items-end p-4">
                <img
                  src={apps[1].img}
                  alt={apps[1].title}
                  className="max-h-[400px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
