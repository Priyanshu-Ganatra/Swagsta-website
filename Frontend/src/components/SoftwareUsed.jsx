/* eslint-disable react/prop-types */
const pureref = 'https://cdna.artstation.com/p/softwares/icons/000/004/584/default/PureRef_Logo.png?1660081882';
const zbrush = 'https://cdna.artstation.com/p/softwares/icons/000/000/046/default/zBrush3.png?1505488078';
const maya = 'https://cdna.artstation.com/p/softwares/icons/000/000/024/default/maya.png?1504879343';
const blender = 'https://cdna.artstation.com/p/softwares/icons/000/000/008/default/blender_icon_1024x1024.png?1570478232';
const photoshop = 'https://cdna.artstation.com/p/softwares/icons/000/000/032/default/Photoshop.png?1608144074';

const SoftwareUsed = ({ data, className }) => {
    const getLogo = (name) => {
        if (name.toLowerCase() === 'pureref') {
            return <img width="16" height="16" src={pureref} alt={name} />;
        }
        if (name.toLowerCase() === 'zbrush') {
            return <img width="16" height="16" src={zbrush} alt={name} />;
        }
        if (name.toLowerCase() === 'maya') {
            return <img width="16" height="16" src={maya} alt={name} />;
        }
        if (name.toLowerCase() === 'blender') {
            return <img width="16" height="16" src={blender} alt={name} />;
        }
        if (name.toLowerCase() === 'photoshop') {
            return <img width="16" height="16" src={photoshop} alt={name} />;
        }
        return null;
    };

    return (
        <div className={`${className}`}>
            <h4 className="font-semibold text-[16px] mb-2 text-creativeTitle">
                Software Used
            </h4>
            <div className="flex gap-2 flex-wrap">
                {
                    data?.softwareUsed?.map((sw, i) => (
                        <div key={i} className="software-item flex bg-[#404044] hover:bg-[#5b5b61] rounded justify-center items-center p-[2px] text-creativeTitle hover:cursor-pointer px-2 gap-2">
                            {getLogo(sw)}
                            {sw}
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default SoftwareUsed;
