import LoginBtn from "@/Components/Element/LoginBtn";
import { PlusCircleIcon } from "lucide-react";
import TableShimmer from "@/Utility/Shimmers/TableShimmer";
import VerificationPopup from "@/Components/Popups/VerificationPopup";
import BookTable from "@/Utility/Tables/BookTable";
import useHomeHelper from "./helper";
import CreateEditPopup from "./CreateEditPopup";
import ViewBookDetailPopup from "./ViewBookDetailPopup";


function Home() {
  const { loader, showCreatePopup, setShowCreatePopup, showEditPopup, setShowEditPopup, showDeletePopup, setShowDeletePopup,
    deleteLoader, successCallback, books, DeleteBook, showViewPopup, setShowViewPopup, role } = useHomeHelper()
  return (
    <>
      <div className='space-y-6'>
        <div className="flex items-center justify-between flex-wrap gap-x-10 gap-y-3">
          <h2 className="text-[#03045D] font-semibold text-xl">Books</h2>
          {role == "author" &&
            <div className="flex gap-3">
              <LoginBtn className={'text-xs bg-black px-6 h-8'} stroke={'#fff'} title={'Create Book'} startIcon={PlusCircleIcon} onClick={() => setShowCreatePopup(!showCreatePopup)} iconSize={14} />
            </div>
          }
        </div>
        {loader ?
          <TableShimmer columns={4} />
          :
          <BookTable
            data={books}
            onEditClick={(data) => { setShowEditPopup(data) }}
            onDeleteClick={(data) => { setShowDeletePopup(data) }}
            onViewClick={(data) => { setShowViewPopup(data) }}
            role={role}
          />
        }
      </div>

      {(showEditPopup?.id || showCreatePopup) &&
        <CreateEditPopup
          open={showEditPopup?.id || showCreatePopup}
          close={showEditPopup ? setShowEditPopup : setShowCreatePopup}
          title={showEditPopup ? 'Edit Book' : 'Create Book'}
          editData={showEditPopup}
          successCallback={successCallback}
        />
      }

      <VerificationPopup
        open={showDeletePopup?.id}
        close={setShowDeletePopup}
        title={<div className='flex flex-col space-y-4 mx-auto items-center justify-center pb-4 text-center'>
          <h2 className=''>Are you sure you want to delete this
            <br /> Book?</h2>
        </div>}
        hideCloseButton={true}
        loading={deleteLoader}
        onConfirm={DeleteBook}
      />

      {showViewPopup?.id &&
        <ViewBookDetailPopup
          open={showViewPopup?.id}
          close={setShowViewPopup}
          editData={showViewPopup}
          successCallback={() => { successCallback(true) }}
        />
      }
    </>
  );
}

export default Home;
