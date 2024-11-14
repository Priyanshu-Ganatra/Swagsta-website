/* eslint-disable react/prop-types */
import { MdStar } from 'react-icons/md'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const RemainingGrid = ({ exceptId }) => {
  const { loading, projects } = useSelector(state => state.projects)

  return (
    <>
      {loading
        ?
        <div className='flex h-[200px] justify-center gap-3 flex-col whitespace-nowrap items-center'>
          <span className="loading loading-ring loading-lg"></span>
          <p>Loading other projects...</p>
        </div>
        :
        <>
          {
            !loading && projects.length > 1 && (
              <h2 className="text-2xl font-bold mb-4">Explore other projects</h2>
            )
          }
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {
              projects.map((item) => {
                const isFeatured = item.featured;
                const isLarge = item.likes >= 10
                const colSpan = isLarge ? 'col-span-2' : 'col-span-1';
                const rowSpan = isLarge ? 'row-span-2' : 'row-span-1';
                const shouldShow = item._id !== exceptId

                return (
                  shouldShow && (
                    <Link
                      key={item._id}
                      className={`relative ${colSpan} ${rowSpan} hover:cursor-pointer aspect-square rounded-lg bg-white overflow-hidden`}
                      to={`/project/${item._id}`}
                    >
                      <img
                        src={item.coverImg}
                        alt={`Project ${item._id}`}
                        className="w-full h-full object-cover"
                      />
                      {isFeatured && (
                        <div className="absolute top-2 right-2 bg-yellow-400 rounded-full p-1">
                          <MdStar size={16} />
                        </div>
                      )}
                    </Link>
                  )
                )
              })}
          </div>
        </>
      }
    </>
  )
}

export default RemainingGrid