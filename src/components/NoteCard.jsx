import { Earth, LockKeyhole, SquarePen, Trash2 } from "lucide-react";
import { useAuthState } from "../contextapi/Authstate";
import { useState } from "react";
import EditNotesModal from "./EditNotesModel";
import { useNoteState } from "../contextapi/NoteState";

const NoteCard = ({
  title,
  description,
  tag,
  image,
  updatedAt,
  isPrivate,
  category,
  noteId,
  userId,
  userName,
}) => {
  const { profile } = useAuthState();

  const { deleteNote } = useNoteState();
  const [open, setOpen] = useState(false);

  console.log(category);

  return (
    <>
      <EditNotesModal
        open={open}
        setOpen={setOpen}
        eisPrivate={isPrivate}
        etitle={title}
        edescription={description}
        etag={tag}
        noteId={noteId}
      />
      <div className="overflow-hidden transition-shadow relative duration-300 bg-white rounded shadow-sm">
        {category == "private" && profile?._id == userId && (
          <div className="flex absolute right-0 top-0 bg-white/75 rounded-bl-sm px-4 py-3">
            <span className="mx-2 cursor-pointer" onClick={() => setOpen(true)}>
              <SquarePen />
            </span>
            <span className="mx-2 cursor-pointer" onClick={()=>deleteNote(noteId)}>
              <Trash2 />
            </span>
          </div>
        )}
        <img
          src={
            image
              ? image
              : "https://images.pexels.com/photos/447592/pexels-photo-447592.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
          }
          className="object-cover w-full h-64"
          alt=""
        />
        <div className="p-3">
          <p className="mb-3 flex justify-between items-center gap-3 text-xs font-semibold tracking-wide uppercase">
            <span className="text-gray-600">
              {" "}
              {new Date(updatedAt).toLocaleString()}{" "}
            </span>
            {isPrivate ? (
              <LockKeyhole size={"18px"} />
            ) : (
              <Earth size={"18px"} />
            )}
          </p>
          <h1 className="inline-block mb-3 text-md font-bold leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700">
            {title}
          </h1>
          <p className="mb-2 text-gray-700">{description}</p>
          <p className="mb-2 text-gray-700">{tag?.join(" ")}</p>
          {category == "public" && (
            <p className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800">
              Created By: {userName}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default NoteCard;
