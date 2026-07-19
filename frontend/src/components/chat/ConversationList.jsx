import React, { useState } from 'react';
import { HiOutlinePlus, HiOutlineChatBubbleLeft, HiOutlineTrash, HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { formatRelativeTime } from '../../utils/formatters';

const ConversationList = ({ 
  conversations, 
  activeId, 
  onSelect, 
  onNew, 
  onDelete,
  loading
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = conversations.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 w-full md:w-80 flex-shrink-0">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800">
        <Button 
          variant="primary" 
          fullWidth 
          onClick={onNew}
          leftIcon={<HiOutlinePlus />}
          className="mb-4"
        >
          New Chat
        </Button>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <HiOutlineMagnifyingGlass className="text-slate-400 w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-100 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-900 border focus:border-indigo-500 rounded-lg text-sm transition-colors text-slate-900 dark:text-white"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {loading ? (
          <div className="p-4 text-center text-slate-500">Loading...</div>
        ) : filteredConversations.length === 0 ? (
          <div className="p-4 text-center text-slate-500 text-sm">
            {searchTerm ? 'No matches found.' : 'No conversations yet.'}
          </div>
        ) : (
          filteredConversations.map((conv) => (
            <div
              key={conv.id || conv._id}
              onClick={() => onSelect(conv.id || conv._id)}
              className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                activeId === (conv.id || conv._id)
                  ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300'
                  : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <HiOutlineChatBubbleLeft className={`w-5 h-5 flex-shrink-0 ${activeId === (conv.id || conv._id) ? 'text-indigo-500' : 'text-slate-400'}`} />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium text-sm">{conv.title}</div>
                  <div className="flex items-center justify-between mt-1">
                    {conv.type && (
                      <Badge color="blue" size="sm" className="text-[10px] px-1.5 py-0">
                        {conv.type}
                      </Badge>
                    )}
                    <span className="text-xs text-slate-400 ml-auto truncate pl-2">
                      {formatRelativeTime(conv.updatedAt)}
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(conv.id || conv._id);
                }}
                className={`ml-2 p-1.5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 opacity-0 group-hover:opacity-100 transition-all ${activeId === (conv.id || conv._id) ? 'opacity-100' : ''}`}
                title="Delete conversation"
              >
                <HiOutlineTrash className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ConversationList;
