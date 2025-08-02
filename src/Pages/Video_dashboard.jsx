import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getchanneldetails, getVideoById, getAllComments, subscribe, unsubscribe, addliketoVideo, addliketocomment, unlikevideo, unlikecomment, addComment, updateComment, deleteComment } from '../utils';
import { XCircleIcon, PencilIcon, HandThumbUpIcon, UserIcon, CalendarIcon, EyeIcon, HeartIcon, ChatBubbleLeftIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import LoginAlert from '../components/LoginAlert.jsx';

export default function VideoDashboard() {
    const currentuser = useSelector(state => state.auth.userdata)
    const isAuthenticated = useSelector((state) => state.auth.status);
    const location = useLocation()
    const navigate = useNavigate()
    const { video } = location.state || {}
    const [subscribercnt, setsubcnt] = useState(video.ownerinfo?.subscriberCount)
    const [comments, setcomments] = useState([])
    const [newComment, setNewComment] = useState("");
    const [liked, setLiked] = useState(video.isliked);
    const [likes, setLikes] = useState(video.likedby);
    const [ismine, setismine] = useState(false)
    const [isSubscribed, setIsSubscribed] = useState(video.ownerinfo?.issubscribed);
    const [page, setpage] = useState(1)
    const [limit, setlimit] = useState(30)
    const [error, seteror] = useState({})
    const [showLoginAlert, setShowLoginAlert] = useState(false)
    const [loginAlertConfig, setLoginAlertConfig] = useState({
        title: "Login Required",
        message: "Please login to continue"
    })

    const getcomments = useCallback(async () => {
        // Only fetch comments if user is authenticated
        if (!isAuthenticated) {
            return;
        }
        
        seteror({})
        const re = await getAllComments(video._id, { page: page || 1, limit: limit || 30 })
        if (re.error) {
            seteror(prev => ({ ...prev, comment: re.error.message }))
            return;
        }
        setcomments(re.data.data.itemsList)
        return;
    }, [page, limit, isAuthenticated, video._id])

    useEffect(() => {
        getcomments();
    }, [getcomments])

    useEffect(() => {
        if (currentuser?._id === video.ownerinfo_id) setismine(true);
    }, [])

    const handleLikeVideo = async (e) => {
        e.preventDefault()
        
        // Check if user is authenticated
        if (!isAuthenticated) {
            setLoginAlertConfig({
                title: "Login to Like",
                message: "Please login to like this video"
            });
            setShowLoginAlert(true);
            return;
        }

        seteror({})
        if (liked) {
            const result = await unlikevideo(video?._id)
            if (result.error) {
                seteror(prev => ({ ...prev, unlikevideo: result.error.message }))
                return;
            }
            setLiked(false);
            setLikes(prev => (prev - 1))
        } else {
            const result = await addliketoVideo(video?._id)
            if (result.error) {
                seteror(prev => ({ ...prev, likevideo: result.error.message }))
                return;
            }
            setLiked(true);
            setLikes(prev => (prev + 1))
        }
    };

    const chaneldashboard = async (e) => {
        seteror({})
        const result = await getchanneldetails(video?.ownerinfo?.username);
        if (result.error) {
            seteror(prev => ({ ...prev, general: result.error.message }))
            return;
        }
        const chanel = result.data.data
        navigate('/dashboard', { state: { channel: chanel[0] } });
    }

    const handleAddComment = async () => {
        // Check if user is authenticated
        if (!isAuthenticated) {
            setLoginAlertConfig({
                title: "Login to Comment",
                message: "Please login to add a comment"
            });
            setShowLoginAlert(true);
            return;
        }

        seteror({})
        if (newComment.trim()) {
            const result = await addComment(video?._id, { comment: newComment })
            if (result.error) {
                seteror(prev => ({ ...prev, comment: result.error.message }))
                return;
            }
            getcomments()
            setNewComment("");
        } else {
            seteror(prev => ({ ...prev, comment: "Please add a comment" }))
        }
    };

    const handleSubscribe = async () => {
        // Check if user is authenticated
        if (!isAuthenticated) {
            setLoginAlertConfig({
                title: "Login to Subscribe",
                message: "Please login to subscribe to this channel"
            });
            setShowLoginAlert(true);
            return;
        }

        let result
        if (isSubscribed) {
            result = await unsubscribe(video.ownerinfo?.username)
        } else {
            result = await subscribe(video.ownerinfo?.username)
        }
        if (result.error) {
            seteror(prev => ({ ...prev, subscripition: result.error.message }))
            return;
        }
        if (isSubscribed) {
            setsubcnt(prev => (prev - 1))
        } else setsubcnt(prev => (prev + 1))
        setIsSubscribed(prev => !prev)
        return;
    }

    const editvideo = (e) => {
        navigate('/updateVideo', { state: { videoData: video } })
    }

    const handleCloseLoginAlert = () => {
        setShowLoginAlert(false);
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8'>
            <div className="max-w-6xl mx-auto">
                {/* Video Player Section */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
                    <div className="relative w-full">
                        <video
                            src={video.videoFile}
                            controls
                            className="w-full h-auto rounded-t-2xl"
                        />
                    </div>
                </div>

                {/* Video Info Section */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                    {/* Owner Info + Subscribe Button */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <img
                                onClick={chaneldashboard}
                                src={video.ownerinfo?.avatar}
                                alt="Avatar"
                                className="w-14 h-14 rounded-full border-2 border-gray-200 cursor-pointer hover:border-red-500 transition-colors duration-200"
                            />
                            <div>
                                <h2 className="font-semibold text-lg text-gray-900">{video.ownerinfo?.fullName}</h2>
                                <p className="text-sm text-gray-600">@{video.ownerinfo?.username}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <EyeIcon className="h-4 w-4 text-gray-400" />
                                    <span className="text-sm text-gray-500">{subscribercnt} subscribers</span>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col items-center gap-2'>
                            <button
                                onClick={handleSubscribe}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                    isSubscribed
                                        ? "bg-green-600 text-white hover:bg-green-700"
                                        : "bg-red-600 text-white hover:bg-red-700"
                                }`}
                            >
                                {isSubscribed ? "Subscribed" : "Subscribe"}
                            </button>
                        </div>
                    </div>

                    {/* Title + Views + Likes */}
                    <div className="space-y-4">
                        <h1 className="text-2xl font-bold text-gray-900">{video.tittle}</h1>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <EyeIcon className="h-4 w-4" />
                                    <span>{video.views} views</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <CalendarIcon className="h-4 w-4" />
                                    <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {ismine && (
                                    <button
                                        onClick={editvideo}
                                        className='px-4 py-2 rounded-lg text-sm text-white font-medium bg-blue-600 hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2'
                                    >
                                        <PencilIcon className="h-4 w-4" />
                                        Edit
                                    </button>
                                )}
                                <button
                                    onClick={handleLikeVideo}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                                        liked
                                            ? "bg-red-600 text-white hover:bg-red-700"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                                >
                                    <HandThumbUpIcon className="h-4 w-4" />
                                    {likes}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description Section */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                    <h2 className='text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2'>
                        <ChatBubbleLeftIcon className="h-5 w-5" />
                        Description
                    </h2>
                    <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {video.description}
                    </div>
                </div>

                {/* Comments Section - Locked for non-authenticated users */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                    <h2 className="text-xl font-semibold mb-6 text-gray-900 flex items-center gap-2">
                        <ChatBubbleLeftIcon className="h-6 w-6" />
                        Comments
                        {!isAuthenticated && (
                            <span className="text-sm font-normal text-gray-500">(Login to view)</span>
                        )}
                    </h2>

                    {!isAuthenticated ? (
                        /* Locked Comments Section for Non-Authenticated Users */
                        <div className="text-center py-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                <LockClosedIcon className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Comments are locked</h3>
                            <p className="text-gray-600 mb-6">Login to view and add comments to this video</p>
                            <button
                                onClick={() => {
                                    setLoginAlertConfig({
                                        title: "Login to View Comments",
                                        message: "Please login to view and add comments"
                                    });
                                    setShowLoginAlert(true);
                                }}
                                className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-200 font-medium"
                            >
                                Login to Continue
                            </button>
                        </div>
                    ) : (
                        /* Comments Section for Authenticated Users */
                        <>
                            {/* Add Comment */}
                            <div className="flex gap-3 mb-6">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Add a comment..."
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-200"
                                    />
                                </div>
                                <button
                                    onClick={handleAddComment}
                                    className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-200 font-medium"
                                >
                                    Post
                                </button>
                            </div>

                            {/* Error Message */}
                            {error?.comment && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-red-600 text-sm">{error?.comment}</p>
                                </div>
                            )}

                            {/* Existing Comments */}
                            <div className="space-y-4">
                                {comments.length > 0 ? (
                                    comments.map((comment) => (
                                        <CommentCard key={comment._id} comment={comment} video={video} fn={getcomments} />
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <ChatBubbleLeftIcon className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                                        <p>No comments yet. Be the first to comment!</p>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Login Alert Modal */}
            <LoginAlert 
                isOpen={showLoginAlert}
                onClose={handleCloseLoginAlert}
                title={loginAlertConfig.title}
                message={loginAlertConfig.message}
            />
        </div>
    );
}

function CommentCard({ comment, video, fn }) {
    const currentuser = useSelector(state => state.auth.userdata)
    const isAuthenticated = useSelector((state) => state.auth.status);
    const [liked, setLiked] = useState(comment.isliked);
    const [likes, setLikes] = useState(comment.likedby);
    const [isMine, setismine] = useState(false)
    const [isedit, setisedit] = useState(false)
    const [showOptions, setShowOptions] = useState(false);
    const [error, seterror] = useState("")
    const [content, setcontent] = useState(comment?.content)
    const navigate = useNavigate()

    const chaneldashboard = async (e) => {
        seterror("")
        const result = await getchanneldetails(comment?.ownerinfo?.username);
        if (result.error) {
            seterror(prev => (result.error.message))
            return;
        }
        const chanel = result.data.data
        navigate('/dashboard', { state: { channel: chanel[0] } });
    }

    useEffect(() => {
        if (currentuser._id === comment.ownerinfo?._id)
            setismine(true)
    }, [comment])

    const handleLike = async (e) => {
        e.preventDefault()
        
        // Check if user is authenticated
        if (!isAuthenticated) {
            // Show login alert for comment likes
            return;
        }

        seterror("")
        if (liked) {
            const result = await unlikecomment(comment._id)
            if (result.error) {
                seterror("Error in unliking comment")
                return;
            }
            setLiked(false);
            setLikes(prev => (prev - 1))
        } else {
            const result = await addliketocomment(comment._id)
            if (result.error) {
                seterror("Error in liking comment")
                return;
            }
            setLiked(true);
            setLikes(prev => (prev + 1))
        }
    };

    const editcommnet = async () => {
        seterror("")
        if (!content.trim()) {
            seterror("Comment should not be blank")
            return;
        }
        const re = await updateComment(video._id, comment._id, {
            content: content.trim()
        })
        if (re.error) {
            seterror("Error in updating comment")
            return;
        }
        setisedit(false)
    }

    const Delete = async () => {
        seterror("")
        const result = await deleteComment(video._id, comment._id)
        if (result.error) {
            seterror("Error in deleting Comment")
            return;
        }
        setismine(false)
        fn()
    }

    return (
        <div className='bg-gray-50 rounded-xl p-4'>
            <div className="flex gap-4 items-start">
                {/* Avatar */}
                <img
                    onClick={chaneldashboard}
                    src={comment.ownerinfo?.avatar || 'https://api.dicebear.com/7.x/initials/svg?seed=User'}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full border-2 border-gray-200 cursor-pointer hover:border-red-500 transition-colors duration-200 flex-shrink-0"
                />

                {/* Content and Controls */}
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-4">
                        {/* Comment Content */}
                        <div className="flex-1">
                            <textarea
                                disabled={!isedit}
                                value={content}
                                onChange={(e) => {
                                    setcontent(e.target.value);
                                }}
                                className={`w-full font-medium text-sm resize-none bg-transparent text-gray-900 border-none outline-none ${
                                    isedit ? 'ring-2 ring-red-500/50 rounded-lg p-2' : ''
                                }`}
                                style={{
                                    whiteSpace: 'pre-wrap',
                                    overflowWrap: 'break-word',
                                }}
                            />
                        </div>

                        {/* Like and Edit/Delete Buttons */}
                        {!isedit && (
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <button
                                    onClick={handleLike}
                                    className={`text-xs px-3 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1 ${
                                        liked
                                            ? 'bg-red-500 text-white hover:bg-red-600'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    <HandThumbUpIcon className="h-3 w-3" />
                                    {likes}
                                </button>

                                {isMine && (
                                    <div className="relative">
                                        <button
                                            onClick={() => setShowOptions(prev => !prev)}
                                            className="text-xs px-2 py-1.5 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
                                        >
                                            {showOptions ? <XCircleIcon className='h-4 w-4' /> : <PencilIcon className='h-4 w-4' />}
                                        </button>

                                        {showOptions && (
                                            <div className="absolute right-0 mt-1 w-32 bg-white border rounded-lg shadow-lg z-10 text-xs">
                                                <button
                                                    onClick={() => {
                                                        setShowOptions(false);
                                                        setisedit(true)
                                                    }}
                                                    className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-t-lg"
                                                >
                                                    Edit Comment
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setShowOptions(false);
                                                        Delete()
                                                    }}
                                                    className="w-full text-left px-3 py-2 hover:bg-red-50 text-red-600 rounded-b-lg"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Edit Mode Buttons */}
                        {isedit && (
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <button
                                    onClick={editcommnet}
                                    className='bg-green-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors duration-200'
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => {
                                        seterror("")
                                        setisedit(false)
                                        setcontent(comment.content)
                                    }}
                                    className="p-1.5 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                                >
                                    <XCircleIcon className='h-4 w-4' />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg">
                    <p className='text-red-600 text-xs'>{error}</p>
                </div>
            )}
        </div>
    );
}
